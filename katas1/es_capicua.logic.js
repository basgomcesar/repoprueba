function invertirNumero(numero) {
  return numero.split("").reverse().join("");
}

function esCapicua(numero) {
  const reversa = invertirNumero(numero);
  return numero === reversa;
}

module.exports = {
  invertirNumero,
  esCapicua
};
