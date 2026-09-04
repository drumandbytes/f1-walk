const test = require('node:test');
const assert = require('node:assert/strict');
const { deriveColors } = require('./build');
const { countStops, extractRacingLine } = require('./tools/circuit-data');

test('deriveColors derives rgb/hover/encoded from a hex color', () => {
  const c = deriveColors('#e8001d');
  assert.equal(c.rgb, '232,0,29');
  assert.equal(c.hover, '#c50019');
  assert.equal(c.encoded, '%23e8001d');
});

test('countStops counts top-level stop entries', () => {
  const src = "const stops = [\n  { id:0, label:'SF', name:'Start' },\n  { id:1, label:'T1', name:'Turn 1' },\n];";
  assert.equal(countStops(src), 2);
});

test('extractRacingLine parses the racingLine array literal', () => {
  const src = "const racingLine = [\n  [43.7,7.4],\n  [43.71,7.41],\n];";
  assert.deepEqual(extractRacingLine(src), [[43.7, 7.4], [43.71, 7.41]]);
});
