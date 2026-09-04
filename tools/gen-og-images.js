// Generates circuits/<slug>/preview.png (Open Graph share images) plus the
// hub's preview.png, from real per-circuit data (title, corner count, theme
// color, racing line). Requires ImageMagick (`magick`) on PATH.
//
// Usage: node tools/gen-og-images.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { countStops, extractRacingLine } = require('./circuit-data');

const ROOT = path.join(__dirname, '..');
const CIRCUITS_DIR = path.join(ROOT, 'circuits');
const FONT = '/System/Library/Fonts/Helvetica.ttc';
const FONT_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf';
const W = 1200, H = 630;

// Maps a circuit's real lat/lng racing line into screen-space points inside
// a target box, preserving aspect ratio (small-circuit scale, so treating
// lat/lng degrees as locally equirectangular is fine for a decorative mark).
function trackToScreenPoints(racingLine, box) {
  const lats = racingLine.map(p => p[0]);
  const lngs = racingLine.map(p => p[1]);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;
  const scale = Math.min(box.w / lngRange, box.h / latRange);
  const drawnW = lngRange * scale, drawnH = latRange * scale;
  const offX = box.x + (box.w - drawnW) / 2;
  const offY = box.y + (box.h - drawnH) / 2;
  // Downsample for a clean decorative line rather than the full dense path.
  const step = Math.max(1, Math.floor(racingLine.length / 70));
  const sampled = racingLine.filter((_, i) => i % step === 0);
  return sampled.map(([lat, lng]) => {
    const x = offX + (lng - minLng) * scale;
    const y = offY + (maxLat - lat) * scale; // north (higher lat) = up
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function checklistMvg(items, startY) {
  const rowH = 51;
  return items.map((text, i) => {
    const cy = startY + i * rowH;
    return `
fill "#e8001d"
circle ${79},${cy} ${90},${cy - 11}
font "${FONT_BOLD}"
font-size 15
fill "#ffffff"
text ${73},${cy + 5} "✓"
font "${FONT}"
font-size 22
fill "#cccccc"
text 104,${cy + 7} "${esc(text)}"`;
  }).join('\n');
}

function buildMvg({ titleLines, subtitle, accent, checklist, domain, trackPoints }) {
  return `push graphic-context
viewbox 0 0 ${W} ${H}
fill "#150808"
rectangle 0,0 ${W},318
fill "#1c1c1c"
rectangle 0,318 ${W},${H}

fill "#e8001d"
roundrectangle 64,58 138,100 4,4
font "${FONT_BOLD}"
font-size 21
fill "#ffffff"
text 78,86 "F1"

font "${FONT_BOLD}"
font-size 62
fill "#ffffff"
text 64,163 "${esc(titleLines[0])}"
text 64,255 "${esc(titleLines[1])}"

font "${FONT}"
font-size 27
fill "#999999"
text 64,332 "${esc(subtitle)}"

stroke "${accent}"
stroke-width 3
fill none
line 64,373 520,373
stroke none

${checklistMvg(checklist, 410)}

font "${FONT}"
font-size 18
fill "#3a3a3a"
text 64,583 "${esc(domain)}"

stroke "${accent}"
stroke-width 4
fill none
stroke-linejoin round
stroke-linecap round
polyline ${trackPoints}
pop graphic-context
`;
}

function render(mvg, outPath) {
  const tmp = path.join('/tmp', `og-${Date.now()}-${Math.random().toString(36).slice(2)}.mvg`);
  fs.writeFileSync(tmp, mvg);
  execFileSync('magick', [`mvg:${tmp}`, '-depth', '8', outPath]);
  fs.unlinkSync(tmp);
}

const CHECKLIST = ['Historical facts & famous corners', 'Auto-advance GPS tracking', 'Free · No tracking · Offline maps'];
const TRACK_BOX = { x: 660, y: 70, w: 480, h: 490 };

function main() {
  const slugs = fs.readdirSync(CIRCUITS_DIR).filter(f =>
    fs.statSync(path.join(CIRCUITS_DIR, f)).isDirectory()
  );

  const hubCircuits = [];

  for (const slug of slugs) {
    const dir = path.join(CIRCUITS_DIR, slug);
    const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
    const dataSrc = fs.readFileSync(path.join(dir, 'data.js'), 'utf8');
    const racingLine = extractRacingLine(dataSrc);
    const stopCount = countStops(dataSrc);
    const corners = stopCount - 1;

    const titleLine1 = meta.title.replace(/ Circuit Walk$/, '');
    const trackPoints = trackToScreenPoints(racingLine, TRACK_BOX);

    const mvg = buildMvg({
      titleLines: [titleLine1, 'Circuit Walk'],
      subtitle: `${corners} corners · GPS · Works offline`,
      accent: meta.themeColor,
      checklist: CHECKLIST,
      domain: `f1walk.drumandbytes.dev/${slug}`,
      trackPoints,
    });
    const outPath = path.join(dir, 'preview.png');
    render(mvg, outPath);
    console.log(`generated circuits/${slug}/preview.png`);

    hubCircuits.push({ slug, color: meta.themeColor });
  }

  // Hub preview: no single track outline (it represents all circuits), just
  // small colored pins for each circuit as a light decorative echo of the
  // per-circuit accent colors used throughout the site.
  const pins = hubCircuits.map((c, i) => {
    const cols = 3;
    const cx = 760 + (i % cols) * 130;
    const cy = 230 + Math.floor(i / cols) * 150;
    return `fill "${c.color}"\ncircle ${cx},${cy} ${cx + 22},${cy}`;
  }).join('\n');

  const hubMvg = `push graphic-context
viewbox 0 0 ${W} ${H}
fill "#0a0a0a"
rectangle 0,0 ${W},318
fill "#1c1c1c"
rectangle 0,318 ${W},${H}

fill "#e8001d"
roundrectangle 64,58 138,100 4,4
font "${FONT_BOLD}"
font-size 21
fill "#ffffff"
text 78,86 "F1"

font "${FONT_BOLD}"
font-size 62
fill "#ffffff"
text 64,163 "F1 Circuit"
text 64,255 "Walks"

font "${FONT}"
font-size 27
fill "#999999"
text 64,332 "5 real F1 street circuits · GPS · Free"

stroke "#e8001d"
stroke-width 3
fill none
line 64,373 520,373
stroke none

${checklistMvg(['Monaco · Baku · Singapore · Vegas · Melbourne', 'Live GPS tracking on every circuit', 'Free · No tracking · Offline maps'], 410)}

font "${FONT}"
font-size 18
fill "#3a3a3a"
text 64,583 "f1walk.drumandbytes.dev"

${pins}
pop graphic-context
`;
  render(hubMvg, path.join(ROOT, 'preview.png'));
  console.log('generated preview.png (hub)');
}

main();
