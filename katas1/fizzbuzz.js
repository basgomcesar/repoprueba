const { generateFizzBuzz } = require('./fizzbuzz.logic');

const firstArgument = process.argv[2];

function printResult(value) {
  if (Number.isNaN(value)) {
    console.log("No es un numero valido.");
  } else {
    printMultiples(Number(value));
  }
}

function printMultiples(limit) {
  const result = generateFizzBuzz(limit);

  result.forEach(value => console.log(value));
}

printResult(firstArgument);
