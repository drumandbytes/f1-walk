// Builds dist/ from templates/circuit.html + circuits/<slug>/{meta.json,data.js,seo.html}.
// No dependencies — runs on the Node preinstalled on GitHub's ubuntu-latest runners.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'templates', 'circuit.html'), 'utf8');
const HUB_TEMPLATE = fs.readFileSync(path.join(ROOT, 'templates', 'hub.html'), 'utf8');
const CIRCUITS_DIR = path.join(ROOT, 'circuits');
const DIST = path.join(ROOT, 'dist');

const STATIC_ASSETS = ['manifest.json', 'sw.js', 'icon.svg', 'apple-touch-icon.png', '_headers', 'preview.png', 'robots.txt'];

const SITE_ORIGIN = 'https://f1walk.drumandbytes.dev';
const PUBLISHER = { '@type': 'Organization', name: 'Drum and Bytes', url: 'https://drumandbytes.com' };

// Pulls SF_POS out of a circuit's data.js without executing the whole file
// (it references an rl() helper that only exists in the page template).
function extractSFPos(dataJsSrc) {
  const m = dataJsSrc.match(/const SF_POS\s*=\s*\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\]/);
  if (!m) throw new Error('Could not find SF_POS in data.js');
  return [parseFloat(m[1]), parseFloat(m[2])];
}

// Counts stops by matching top-level `{ id:N, label:...` entries in the
// stops array, for the hub's "X / Y visited" progress display.
function countStops(dataJsSrc) {
  const matches = dataJsSrc.match(/\{\s*id\s*:\s*\d+\s*,\s*label\s*:/g);
  if (!matches) throw new Error('Could not count stops in data.js');
  return matches.length;
}

// Pulls the racingLine coordinate array out of a circuit's data.js, for
// drawing a mini track outline on the hub map. Evaluated as a JS literal
// (not JSON.parse) since the source array has trailing commas.
function extractRacingLine(dataJsSrc) {
  const m = dataJsSrc.match(/const racingLine\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('Could not find racingLine in data.js');
  return new Function(`return ${m[1]};`)();
}

// Derives the CSS-variable and favicon color tokens from a single #rrggbb,
// so circuits/<slug>/meta.json only ever has to specify one color.
function deriveColors(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const darken = (c) => Math.max(0, Math.round(c * 0.85));
  const toHex = (c) => c.toString(16).padStart(2, '0');
  return {
    rgb: `${r},${g},${b}`,
    hover: `#${toHex(darken(r))}${toHex(darken(g))}${toHex(darken(b))}`,
    encoded: '%23' + hex.replace('#', ''),
  };
}

function renderCircuit(slug) {
  const dir = path.join(CIRCUITS_DIR, slug);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
  const data = fs.readFileSync(path.join(dir, 'data.js'), 'utf8').replace(/\n$/, '');
  const seo = fs.readFileSync(path.join(dir, 'seo.html'), 'utf8').replace(/\n$/, '');

  const modifiedTime = new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
  const colors = deriveColors(meta.themeColor);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: meta.ogTitle,
        description: meta.ogDescription,
        image: meta.ogImage,
        datePublished: meta.publishedTime,
        dateModified: modifiedTime,
        url: meta.canonicalUrl,
        inLanguage: 'en',
        author: PUBLISHER,
        publisher: PUBLISHER,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'F1 Circuit Walks', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: meta.title, item: meta.canonicalUrl },
        ],
      },
    ],
  };
  const welcomeStepsHtml = meta.welcomeSteps
    .map((t, i) => `        <div class="welcome-step"><div class="step-num">${i + 1}</div><div class="step-text">${t}</div></div>`)
    .join('\n');

  const tokens = {
    '{{TITLE}}': meta.title,
    '{{PUBLISHED_TIME}}': meta.publishedTime,
    '{{MODIFIED_TIME}}': modifiedTime,
    '{{OG_TITLE}}': meta.ogTitle,
    '{{OG_DESCRIPTION}}': meta.ogDescription,
    '{{CANONICAL_URL}}': meta.canonicalUrl,
    '{{OG_IMAGE}}': meta.ogImage,
    '{{OG_IMAGE_ALT}}': meta.ogImageAlt,
    '{{TWITTER_TITLE}}': meta.twitterTitle,
    '{{TWITTER_DESCRIPTION}}': meta.twitterDescription,
    '{{THEME_COLOR}}': meta.themeColor,
    '{{THEME_COLOR_HOVER}}': colors.hover,
    '{{THEME_COLOR_RGB}}': colors.rgb,
    '{{THEME_COLOR_ENCODED}}': colors.encoded,
    '{{APPLE_TITLE}}': meta.appleTitle,
    '{{STOP_COUNT_LABEL}}': meta.stopCountLabel,
    '{{ABOUT_STORY}}': meta.aboutStory,
    '{{HELP_SUBTITLE}}': meta.helpSubtitle,
    '{{HELP_OFFLINE_NOTE}}': meta.helpOfflineNote,
    '{{QUIRK_TITLE}}': meta.quirkTitle,
    '{{QUIRK_BODY}}': meta.quirkBody,
    '{{WELCOME_SUB}}': meta.welcomeSub,
    '{{WELCOME_STEPS}}': welcomeStepsHtml,
    '{{SLUG}}': meta.slug,
    '{{SEO_CONTENT}}': seo,
    '{{SCHEMA_JSON}}': JSON.stringify(schema),
    '/*__CIRCUIT_DATA__*/': data,
  };

  let out = TEMPLATE;
  for (const [token, value] of Object.entries(tokens)) {
    if (value === undefined) throw new Error(`Missing value for ${token} in circuits/${slug}/meta.json`);
    out = out.split(token).join(value);
  }
  const leftover = out.match(/\{\{[A-Z_]+\}\}/);
  if (leftover) throw new Error(`Unreplaced token ${leftover[0]} in circuit ${slug}`);
  return out;
}

function renderHub(circuits) {
  const cardsHtml = circuits.map(c => `
    <a class="circuit-card" href="/${c.slug}" data-slug="${c.slug}" data-total="${c.stopCount}" style="--card-accent:${c.themeColor}">
      <div class="circuit-card-name">${c.title}</div>
      <div class="circuit-card-sub">${c.welcomeSub}</div>
      <div class="circuit-card-progress"></div>
      <div class="circuit-card-meta">${c.stopCountLabel} <span class="circuit-card-go">Walk this circuit &rarr;</span></div>
    </a>`).join('\n');

  const markersJs = JSON.stringify(circuits.map(c => ({
    slug: c.slug, title: c.title, lat: c.lat, lng: c.lng, color: c.themeColor, line: c.racingLine,
  })));

  const hubSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'F1 Circuit Walks',
    url: `${SITE_ORIGIN}/`,
    description: 'Free, fan-made walking guides to real F1 street circuits — Monaco, Baku, Singapore, Las Vegas, and Melbourne. GPS tracking, historical facts, offline maps.',
    publisher: PUBLISHER,
  };

  const tokens = {
    '{{HUB_CARDS}}': cardsHtml,
    '{{HUB_SCHEMA}}': JSON.stringify(hubSchema),
    '/*__HUB_CIRCUITS__*/': `const HUB_CIRCUITS = ${markersJs};`,
  };
  let out = HUB_TEMPLATE;
  for (const [token, value] of Object.entries(tokens)) out = out.split(token).join(value);
  return out;
}

function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });
  fs.mkdirSync(path.join(DIST, 'previews'), { recursive: true });

  for (const asset of STATIC_ASSETS) {
    const src = path.join(ROOT, asset);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, asset));
  }

  const slugs = fs.readdirSync(CIRCUITS_DIR).filter(f =>
    fs.statSync(path.join(CIRCUITS_DIR, f)).isDirectory()
  );

  const circuitSummaries = [];
  for (const slug of slugs) {
    const dir = path.join(CIRCUITS_DIR, slug);
    const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
    const dataSrc = fs.readFileSync(path.join(dir, 'data.js'), 'utf8');
    const [lat, lng] = extractSFPos(dataSrc);
    const stopCount = countStops(dataSrc);
    const racingLine = extractRacingLine(dataSrc);
    circuitSummaries.push({
      slug, title: meta.title, welcomeSub: meta.welcomeSub, canonicalUrl: meta.canonicalUrl,
      stopCountLabel: meta.stopCountLabel, themeColor: meta.themeColor, lat, lng, stopCount, racingLine,
    });

    // Flat file, not <slug>/index.html: Cloudflare Pages serves a flat
    // `<slug>.html` at the no-trailing-slash URL (and 308s `/slug/` -> `/slug`),
    // which is the form every circuit's meta.json canonicalUrl / og:url uses.
    // A directory layout gets the opposite treatment (308 `/slug` -> `/slug/`).
    const html = renderCircuit(slug);
    fs.writeFileSync(path.join(DIST, `${slug}.html`), html);
    const previewSrc = path.join(dir, 'preview.png');
    if (fs.existsSync(previewSrc)) fs.copyFileSync(previewSrc, path.join(DIST, 'previews', `${slug}.png`));
    console.log(`built /${slug}`);
  }

  circuitSummaries.sort((a, b) => a.title.localeCompare(b.title));
  fs.writeFileSync(path.join(DIST, 'index.html'), renderHub(circuitSummaries));
  console.log(`built / (hub, ${circuitSummaries.length} circuits)`);

  const lastmod = new Date().toISOString().slice(0, 10);
  const locs = [`${SITE_ORIGIN}/`, ...circuitSummaries.map(c => c.canonicalUrl)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`
    + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    + locs.map(loc => `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')
    + `\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  console.log(`built /sitemap.xml (${locs.length} urls)`);
}

main();
