// Shared data.js parsers used by both build.js (hub map + stop-count label)
// and gen-og-images.js (OG image corner count + track outline).

// Counts stops by matching top-level `{ id:N, label:...` entries in the
// stops array, for the "X / Y visited" progress display.
function countStops(dataJsSrc) {
  const matches = dataJsSrc.match(/\{\s*id\s*:\s*\d+\s*,\s*label\s*:/g);
  if (!matches) throw new Error('Could not count stops in data.js');
  return matches.length;
}

// Pulls the racingLine coordinate array out of a circuit's data.js, for
// drawing a mini track outline on the hub map / OG image. Evaluated as a JS
// literal (not JSON.parse) since the source array has trailing commas.
function extractRacingLine(dataJsSrc) {
  const m = dataJsSrc.match(/const racingLine\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('Could not find racingLine in data.js');
  return new Function(`return ${m[1]};`)();
}

module.exports = { countStops, extractRacingLine };
