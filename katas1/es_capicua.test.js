const execSync = require('child_process').execSync;

test("invierte correctamente", () => {
  const { reversedNumber } = require('./es_capicua.logic');
  expect(reversedNumber("123")).toBe("321");
});

test("invierte una palabra", () => {
  const { reversedNumber } = require('./es_capicua.logic');
  expect(reversedNumber("hola")).toBe("aloh");
});


test("121 es capicua", () => {
  const { isCapicua } = require('./es_capicua.logic');
  expect(isCapicua("121")).toBe(true);
});

test("123 no es capicua", () => {
  const { isCapicua } = require('./es_capicua.logic');
  expect(isCapicua("123")).toBe(false);
});

test("oso es capicua", () => {
  const { isCapicua } = require('./es_capicua.logic');
  expect(isCapicua("oso")).toBe(true);
});

test("121 es capicua", () => {
  const output = execSync('node es_capicua.js 121', { encoding: 'utf-8' });
  const result = normalizeOutput(output);

  expect(result).toBe("121 es capicua");
});

test("123 no es capicua", () => {
  const output = execSync('node es_capicua.js 123', { encoding: 'utf-8' });
  const result = normalizeOutput(output);

  expect(result).toBe("123 no es capicua");
});

const normalizeOutput = (output) =>
  output
    .replace(/\x1B\[[0-9;]*m/g, '') // limpia ANSI (por si acaso)
    .replace(/\r\n/g, '\n')
    .trim();
