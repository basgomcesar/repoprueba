const execSync = require('child_process').execSync;

//Pruebas unitarias
test("2 es primo", () => {
  const { isPrime } = require('./imprimir_primos.logic');
  expect(isPrime(2)).toBe(true);
});

test("4 no es primo", () => {
  const { isPrime } = require('./imprimir_primos.logic');
  expect(isPrime(4)).toBe(false);
});

test("7 es primo", () => {
  const { isPrime } = require('./imprimir_primos.logic');
  expect(isPrime(7)).toBe(true);
});


//Pruebas de aceptación
test("primos hasta 10", () => {
  const { generatePrimes } = require('./imprimir_primos.logic');
  expect(generatePrimes(10)).toEqual([2, 3, 5, 7]);
});

test("primos hasta 2", () => {
  const { generatePrimes } = require('./imprimir_primos.logic');
  expect(generatePrimes(2)).toEqual([2]);
});

test("sin primos", () => {
  const { generatePrimes } = require('./imprimir_primos.logic');
  expect(generatePrimes(1)).toEqual([]);
});

test("debe imprimir los primos hasta 10", () => {
  const resultado = execSync('node imprimir_primos.js 10', { encoding: 'utf-8' }).trim();

  expect(resultado).toBe("Los primos hasta 10 son: 2, 3, 5, 7");
});

test("debe manejar cuando no hay primos", () => {
  const resultado = execSync('node imprimir_primos.js 1', { encoding: 'utf-8' }).trim();

  expect(resultado).toBe("No hay numeros primos para 1");
});

test("debe validar entrada no numerica", () => {
  const resultado = execSync('node imprimir_primos.js hola', { encoding: 'utf-8' }).trim();

  expect(resultado).toBe("No es un número válido.");
});

test("primos hasta 2", () => {
  const resultado = execSync('node imprimir_primos.js 2', { encoding: 'utf-8' }).trim();

  expect(resultado).toBe("Los primos hasta 2 son: 2");
});
