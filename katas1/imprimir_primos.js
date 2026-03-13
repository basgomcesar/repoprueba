const { generarPrimos } = require('./imprimir_primos.logic');

const entrada = process.argv[2];

function imprimirResultado(valor) {
  if (isNaN(Number(valor))) {
    console.log("No es un número válido.");
  } else {
    imprimirPrimos(Number(valor));
  }
}
function imprimirPrimos(limite) {
  const primos = generarPrimos(limite);

  if (primos.length === 0) {
    console.log(`No hay numeros primos para ${limite}`);
  } else {
    console.log(`Los primos hasta ${limite} son: ${primos.join(", ")}`);
  }
}

imprimirResultado(entrada);
