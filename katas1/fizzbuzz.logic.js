function obtenerFizzBuzz(numero) {
  if (numero % 3 === 0 && numero % 5 === 0) {
    return "FizzBuzz";
  }

  if (numero % 3 === 0) {
    return "Fizz";
  }

  if (numero % 5 === 0) {
    return "Buzz";
  }

  return numero;
}

function generarFizzBuzz(limite) {
  const resultado = [];

  for (let i = 1; i <= limite; i++) {
    resultado.push(obtenerFizzBuzz(i));
  }

  return resultado;
}

module.exports = {
  obtenerFizzBuzz,
  generarFizzBuzz
};
