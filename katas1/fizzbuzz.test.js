const execSync = require('child_process').execSync;
const { getFizzBuzz } = require('./fizzbuzz.logic');
const { generateFizzBuzz } = require('./fizzbuzz.logic');


const stripAnsi = (str) => 
  // eslint-disable-next-line no-control-regex
  str.replace(/\x1B\[[0-9;]*m/g, '');


//Pruebas unitarias
test("multiplo de 3", () => {
  expect(getFizzBuzz(3)).toBe("Fizz");
});

test("multiplo de 5", () => {
  expect(getFizzBuzz(5)).toBe("Buzz");
});

test("multiplo de 3 y 5", () => {
  expect(getFizzBuzz(15)).toBe("FizzBuzz");
});

test("numero normal", () => {
  expect(getFizzBuzz(2)).toBe(2);
});


//Prueba de aceptación
test("secuencia hasta 5", () => {
  expect(generateFizzBuzz(5)).toEqual([1, 2, "Fizz", 4, "Buzz"]);
});

test('debe imprimir fizzbuzz hasta 5', () => {
  const output = execSync('node fizzbuzz.js 5', { encoding: 'utf-8' });

  const stripAnsi = (str) => 
    // eslint-disable-next-line no-control-regex
    str.replace(/\x1B\[[0-9;]*m/g, '');

  const lines = output
    .split('\n')
    .map(l => stripAnsi(l).trim())
    .filter(l => l.length > 0);

  expect(lines).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
});

test('debe imprimir fizzbuzz hasta 15', () => {
  const output = execSync('node fizzbuzz.js 15', { encoding: 'utf-8' });

  const lines = output
    .split('\n')
    .map(l => stripAnsi(l).trim())
    .filter(l => l.length > 0);
  expect(lines).toEqual([
    "1", "2", "Fizz", "4", "Buzz",
    "Fizz", "7", "8", "Fizz", "Buzz",
    "11", "Fizz", "13", "14", "FizzBuzz"
  ]);
});
test('entrada no válida', () => {
  const output = execSync('node fizzbuzz.js hola', { encoding: 'utf-8' });

  const normalize = output.toString().trim().replace(/\r\n/g, '\n');
  expect(normalize).toBe('No es un numero valido.');
});
