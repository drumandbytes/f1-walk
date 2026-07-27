# Monaco GP Circuit Walk

A free, fan-made walking guide to all 19 corners of the Circuit de Monaco — with GPS tracking, historical facts, and offline support.

**Live:** [monaco-f1-walk.drumandbytes.dev](https://monaco-f1-walk.drumandbytes.dev)

---

## What it is

A progressive web app (PWA) that guides you around the Monaco Grand Prix street circuit on foot. Each of the 19 corners has:

- Apex speed, gear, and distance into the lap
- Description of the racing line and driving technique
- Historical facts, famous crashes, and circuit lore

Enable GPS and the app follows you automatically — it advances to the next corner as you approach.

## Features

- **Live GPS tracking** — auto-advances to the next corner when you're within 25 metres
- **Nearby highlight** — corner markers turn orange when you're within 40 metres, giving you a heads-up before the panel switches
- **Auto-advance toggle** — turn automatic corner switching on/off via the Auto button
- **All 19 corners** — from Sainte Dévote to Anthony Noghes, plus the S/F line
- **Offline support** — works without signal after first load (map tiles cached); useful as a general Monaco GPS map when roaming doesn't work
- **PWA** — install to home screen via Safari on iOS or Chrome/Brave on Android
- **Screen wake lock** — screen stays on automatically when GPS is active
- **Fullscreen mode** — available on Android and desktop (hidden on iOS where the API is not supported)
- **No tracking** — GPS stays on your device, no cookies, no personal data collected; privacy-friendly Cloudflare Web Analytics (cookieless, aggregate page views only)

## Installing as an app

**iOS:** Open in Safari → Share → Add to Home Screen  
**Android:** Open in Chrome or Brave → install prompt or browser menu → Add to Home Screen

## GPS tracking

Uses the browser's built-in Geolocation API. Measures the distance to the next corner every few seconds (Haversine formula) and auto-advances when you're within 25 metres. Battery/CPU impact is negligible — equivalent to having Maps open.

## Tunnel (T9)

There is a pedestrian path along the full 172m of the tunnel on the **left-hand side** (walking in racing direction). You can walk the entire tunnel section alongside the racing line.

## Files

The site is generated: `templates/circuit.html` is a single shared template, and `circuits/<slug>/` holds each circuit's data (racing line, corner facts, meta copy). `build.js` renders one static page per circuit into `dist/`, which is what actually gets deployed. There's currently one circuit, `monaco`, and its page is also copied to the site root so the existing `monaco-f1-walk.drumandbytes.dev` URL keeps working unchanged.

| Path | Description |
|------|-------------|
| `templates/circuit.html` | Shared HTML/CSS/JS template for every circuit page |
| `circuits/<slug>/data.js` | Racing line, corners, and facts for that circuit |
| `circuits/<slug>/meta.json` | Titles, descriptions, and other per-circuit copy |
| `circuits/<slug>/seo.html` | Hidden crawlable content block for that circuit |
| `build.js` | Renders `templates/` + `circuits/` into `dist/` (no dependencies — plain Node) |
| `dist/` | Build output — generated, not committed |
| `manifest.json` | PWA manifest (name, icons, display mode) |
| `sw.js` | Service worker — caches app shell and OSM map tiles |
| `icon.svg` | Monaco flag app icon (red/white, F1 text) |
| `.github/workflows/deploy.yaml` | GitHub Actions CI — builds and deploys to Cloudflare Pages on push to main |

To work on a circuit's content or copy, edit its files under `circuits/`, or `templates/circuit.html` for changes shared by every circuit, then run `node build.js` and open `dist/monaco/index.html` to preview.

## Deployment

Deployments are handled automatically via GitHub Actions on every push to `main`, which runs `node build.js` and publishes `dist/`. Two secrets are required in the repo settings:

- `CLOUDFLARE_API_TOKEN` — create at Cloudflare dashboard → My Profile → API Tokens
- `CLOUDFLARE_ACCOUNT_ID` — found on the Cloudflare Workers & Pages overview page

To deploy manually:

```bash
node build.js && npx wrangler pages deploy dist --project-name monaco-f1-walk
```

## Data & attribution

Racing line GPS from **[bacinger/f1-circuits](https://github.com/bacinger/f1-circuits)** (MIT licence, OpenStreetMap source).  
Map tiles © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).  
Historical facts are original writing.

## Issues & feedback

Found a corner that's off? A fact that's wrong? [Open an issue](https://github.com/drumandbytes/monaco-f1-walk/issues) — contributions and corrections welcome.

## Disclaimer

Unofficial fan project. Not affiliated with Formula One Licensing B.V., the Fédération Internationale de l'Automobile, or the Automobile Club de Monaco. "Formula 1", "F1", and related marks are trademarks of Formula One Licensing B.V.

## License

MIT — see [LICENSE](LICENSE)

---

Made by [Maris](https://drumandbytes.com) · [Buy me a coffee](https://buymeacoffee.com/justmaris)
