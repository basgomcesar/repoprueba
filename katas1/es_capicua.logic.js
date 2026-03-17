function reversedNumber(number) {
  return number.split("").reverse().join("");
}

function isCapicua(number) {
  const reversa = reversedNumber(number);
  return number === reversa;
}

module.exports = {
  reversedNumber,
  isCapicua
};
