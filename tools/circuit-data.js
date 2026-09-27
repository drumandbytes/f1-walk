// data.js parsers shared by build.js and gen-og-images.js.

// counts top-level `{ id:N, label:...` entries in stops
function countStops(dataJsSrc) {
  const matches = dataJsSrc.match(/\{\s*id\s*:\s*\d+\s*,\s*label\s*:/g);
  if (!matches) throw new Error('Could not count stops in data.js');
  return matches.length;
}

// racingLine as an array; evaluated, not JSON.parse, because of trailing commas
function extractRacingLine(dataJsSrc) {
  const m = dataJsSrc.match(/const racingLine\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('Could not find racingLine in data.js');
  return new Function(`return ${m[1]};`)();
}

module.exports = { countStops, extractRacingLine };
