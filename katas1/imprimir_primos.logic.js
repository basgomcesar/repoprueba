function esPrimo(numero) {
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      return false;
    }
  }
  return true;
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

module.exports = {
  esPrimo,
  generarPrimos
};
