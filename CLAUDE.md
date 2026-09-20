# CLAUDE.md

## Project Overview

F1 Circuit Walks — free, fan-made walking guides to real F1 street circuits (Monaco, Baku, Singapore, Las Vegas, Melbourne). A PWA with live GPS auto-advance, offline maps, and per-corner historical facts. Live at [f1walk.drumandbytes.dev](https://f1walk.drumandbytes.dev). See [README.md](README.md) for user-facing docs.

Note: this local directory is `monaco-f1-walk`, but the GitHub remote is `drumandbytes/f1-walk` — don't assume the repo name from the folder name.

The site is a generated static site, not a framework app: `templates/` + `circuits/<slug>/` data get rendered by `build.js` into flat HTML in `dist/`. No npm, no `package.json`, no dependencies — `build.js` is plain Node.

## Build & test

```bash
node build.js                  # renders dist/, wipes and rebuilds it every time
node --test build.test.js      # unit tests (node:test), no test runner installed
```

Deploy is automatic via GitHub Actions on push to `main` (`.github/workflows/deploy.yaml`, `install-dependencies: false`). Manual deploy: `node build.js && npx wrangler pages deploy dist --project-name monaco-f1-walk`.

Toolchain is just Node (mise.toml pins `node = "24"`; no lockfile because there's nothing to lock).

Output is flat, not `dist/<slug>/index.html`: each circuit builds to `dist/<slug>.html`. This matches Cloudflare Pages' redirect behavior for flat files (a directory layout gets the opposite 308 treatment) — see the comment in `build.js`'s `main()` before changing this.

## Adding a circuit

1. Create `circuits/<slug>/` with three files, using an existing circuit (e.g. `monaco/`) as a reference:
   - **`data.js`** — `const racingLine = [[lat,lng], ...]` (the GPS polyline, sourced from [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits), MIT/OSM), `const SF_POS = [lat,lng]`, and `const stops = [...]`. Each stop is `{ id, label, name, ...rl(N), sector, speed, gear, dist, desc, facts:[...] }` — `rl(N)` (defined in `templates/circuit.html`) looks up `racingLine[N]` so corner positions are indices into the line, never duplicated lat/lng literals.
   - **`meta.json`** — page title, OG/Twitter copy, canonical URL, a single `themeColor` hex (build.js derives hover/rgb/encoded variants from it — don't hand-specify those), welcome steps, etc.
   - **`seo.html`** — hidden crawlable content block.
2. Use `tools/align.html` (open directly in a browser, dev-only Leaflet tool) to place the racing line and corner markers against real map tiles/GPS — this is how `racingLine` and each stop's index into it get set correctly. It exports the `data.js` snippet to paste in.
3. `node build.js` — the hub page picks up any new `circuits/` subdirectory automatically (no registration file to edit). Missing `meta.json` fields or leftover `{{TOKENS}}` fail the build loudly.
4. Optionally regenerate the OG share image: `node tools/gen-og-images.js` (needs ImageMagick's `magick` on `PATH`).

`tools/circuit-data.js` holds the shared `data.js` parsers (`countStops`, `extractRacingLine`) used by both `build.js` and `gen-og-images.js` — they regex/`Function`-eval the source rather than `JSON.parse`, since the arrays use trailing commas.

## Other directories

- `templates/circuit.html`, `templates/hub.html` — shared page shells; build.js does literal `{{TOKEN}}` string substitution into them, no templating engine.
- `vendor/leaflet` — checked-in Leaflet build (used by `tools/align.html`).
- `dist/` — build output, gitignored, never edit by hand.

## Cross-repo

Infra lives elsewhere: `dnb-cloudflare-tf` has `f1walk-redirects.tf` / `f1walk-stats.tf`, and `cloudflare-workers` has the `f1walk-stats-worker`.
