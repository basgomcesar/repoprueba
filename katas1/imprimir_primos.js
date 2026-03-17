const { generatePrimes } = require('./imprimir_primos.logic');

const input = process.argv[2];

function imprimirResultado(value) {
  if (Number.isNaN(value)) {
    console.log("No es un número válido.");
  } else {
    imprimirPrimos(value);
  }
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
