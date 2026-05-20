# Monaco GP Circuit Walk

A free, fan-made walking guide to all 19 corners of the Circuit de Monaco — with GPS tracking, historical facts, and offline support.

**Live:** [monaco-f1-walk.drumandbytes.dev](https://monaco-f1-walk.drumandbytes.dev)

---

## What it is

A progressive web app (PWA) that guides you around the Monaco Grand Prix street circuit on foot. Each of the 19 corners has:

- Apex speed, gear, and distance into the lap
- Description of the racing line and driving technique
- Historical facts, famous crashes, and circuit lore

Enable GPS and the app follows you automatically — it advances to the next corner when you're within 25 metres of it.

## Features

- **Live GPS tracking** — auto-advances as you walk the circuit
- **All 19 corners** — from Sainte Dévote to Anthony Noghes, plus the S/F line
- **Offline support** — works without signal after first load (map tiles cached)
- **PWA** — install to home screen via Safari on iOS or Chrome/Brave on Android
- **Screen wake lock** — screen stays on automatically when GPS is active
- **Fullscreen mode** — available on Android and desktop
- **No tracking** — GPS stays on your device, no data collected, no cookies

## Installing as an app

**iOS:** Open in Safari → Share → Add to Home Screen  
**Android:** Open in Chrome or Brave → install prompt or browser menu → Add to Home Screen

## GPS tracking

Uses the browser's built-in Geolocation API. Measures the distance to the next corner every few seconds (Haversine formula) and auto-advances when you're within 25 metres. Battery/CPU impact is negligible — equivalent to having Maps open.

## Tunnel (T9)

There is a pedestrian path along the full 172m of the tunnel on the right-hand side. You can walk the entire tunnel section alongside the racing line.

## Files

| File | Description |
|------|-------------|
| `index.html` | Main app — all HTML, CSS, and JS in a single file |
| `manifest.json` | PWA manifest (name, icons, display mode) |
| `sw.js` | Service worker — caches app shell and OSM map tiles |
| `icon.svg` | Monaco flag app icon (red/white, F1 text) |

## Deployment

Deployed as a static site on Cloudflare Pages. No build step — just deploy the four files as-is.

```bash
npx wrangler pages deploy . --project-name monaco-f1-walk
```

Or drag and drop the files in the Cloudflare Pages dashboard.

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
