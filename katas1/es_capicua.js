const { esCapicua } = require('./es_capicua.logic');

const entrada = process.argv[2];

function validarEntrada(valor) {
  if (!valor) {
    console.log("Ingresa un string válido");
    return;
  }

  imprimirResultado(valor);
}

function imprimirResultado(numero) {
  if (esCapicua(numero)) {
    console.log(`${numero} es capicua`);
  } else {
    console.log(`${numero} no es capicua`);
  }
}

validarEntrada(entrada);
