const execSync = require('child_process').execSync;
const { reversedNumber } = require('./es_capicua.logic');
const { isCapicua } = require('./es_capicua.logic');

const normalizeOutput = (output) =>
  output
    // eslint-disable-next-line no-control-regex
    .replace(/\x1B\[[0-9;]*m/g, '')
    .replace(/\r\n/g, '\n')
    .trim();


test("invierte correctamente", () => {
  expect(reversedNumber("123")).toBe("321");
});

test("invierte una palabra", () => {
  expect(reversedNumber("hola")).toBe("aloh");
});


test("askes no es capicua", () => {
  expect(isCapicua("askes")).toBe(false);
});

test("oso es capicua", () => {
  expect(isCapicua("oso")).toBe(true);
});

test("capac es capicua", () => {
  const output = execSync('node es_capicua.js capac', { encoding: 'utf-8' });
  const result = normalizeOutput(output);

  expect(result).toBe("capac es capicua");
});
