const { generarFizzBuzz } = require('./fizzbuzz.logic');

const primerArgumento = process.argv[2];

function imprimirResultado(valor) {
  if (isNaN(Number(valor))) {
    console.log("No es un numero valido.");
  } else {
    imprimirMultiplos(Number(valor));
  }
}

function imprimirMultiplos(limite) {
  const resultado = generarFizzBuzz(limite);

  resultado.forEach(valor => console.log(valor));
}

imprimirResultado(entrada);
