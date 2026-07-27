// Builds dist/ from templates/circuit.html + circuits/<slug>/{meta.json,data.js,seo.html}.
// No dependencies — runs on the Node preinstalled on GitHub's ubuntu-latest runners.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'templates', 'circuit.html'), 'utf8');
const CIRCUITS_DIR = path.join(ROOT, 'circuits');
const DIST = path.join(ROOT, 'dist');

// The circuit whose page is also published at the site root, preserving the
// existing monaco-f1-walk.drumandbytes.dev behaviour until a redirect strategy
// for the legacy domain is decided.
const ROOT_SLUG = 'monaco';

const STATIC_ASSETS = ['manifest.json', 'sw.js', 'icon.svg', '_headers', 'preview.png'];

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

function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  for (const asset of STATIC_ASSETS) {
    const src = path.join(ROOT, asset);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, asset));
  }

  const slugs = fs.readdirSync(CIRCUITS_DIR).filter(f =>
    fs.statSync(path.join(CIRCUITS_DIR, f)).isDirectory()
  );

  for (const slug of slugs) {
    const html = renderCircuit(slug);
    const outDir = path.join(DIST, slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log(`built /${slug}/`);
  }

  if (slugs.includes(ROOT_SLUG)) {
    fs.copyFileSync(path.join(DIST, ROOT_SLUG, 'index.html'), path.join(DIST, 'index.html'));
    console.log(`built / (mirrors /${ROOT_SLUG}/)`);
  }
}

main();
