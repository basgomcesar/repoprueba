const entrada = process.argv[2];

if (isNaN(Number(entrada))) {
  console.log("No es un número válido.");
} else {
  imprimirPrimos(entrada);
}

function imprimirPrimos(limite) {
  const primos = generarPrimos(limite);

  if (primos.length === 0) {
    console.log(`No hay numeros primos para ${limite}`);
  } else {
    console.log(`Los primos hasta ${limite} son: ${primos.join(", ")}`);
  }
}

function generarPrimos(limite) {
  const primos = [];

  for (let i = 2; i <= limite; i++) {
    if (esPrimo(i)) {
      primos.push(i);
    }
  }

  return primos;
}

function esPrimo(numero) {
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      return false;
    }
  }
  return true;
}
