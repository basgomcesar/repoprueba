const { generatePrimes } = require('./imprimir_primos.logic');

const input = process.argv[2];

function imprimirResultado(value) {
  const numero = Number(value);

  if (Number.isNaN(numero)) {
    console.log("No es un número válido.");
    return;
  }

  imprimirPrimos(numero);
}

function imprimirPrimos(limit) {
  const primes = generatePrimes(limit);

  if (primes.length === 0) {
    console.log(`No hay numeros primos para ${limit}`);
  } else {
    console.log(`Los primos hasta ${limit} son: ${primes.join(", ")}`);
  }
}

imprimirResultado(input);
