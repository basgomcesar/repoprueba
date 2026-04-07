const { generateFizzBuzz } = require('./fizzbuzz.logic');

const firstArgument = process.argv[2];

function printResult(value) {
  const numero = Number(value);

  if (Number.isNaN(numero)) {
    console.log("No es un numero valido.");
    return;
  }

  printMultiples(numero);
}

function printMultiples(limit) {
  const result = generateFizzBuzz(limit);

  result.forEach(value => console.log(value));
}

printResult(firstArgument);
