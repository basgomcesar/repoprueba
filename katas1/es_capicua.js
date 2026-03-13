const { isCapicua } = require('./es_capicua.logic');

const inputValue = process.argv[2];

function validateInput(value) {
  if (!value) {
    console.log("Ingresa un string valido");
    return;
  }

  printResult(value);
}

function printResult(value) {
  if (isCapicua(value)) {
    console.log(`${value} es capicua`);
  } else {
    console.log(`${value} no es capicua`);
  }
}

validateInput(inputValue);
