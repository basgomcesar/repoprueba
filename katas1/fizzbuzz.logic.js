function getFizzBuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    return "FizzBuzz";
  }

  if (number % 3 === 0) {
    return "Fizz";
  }

  if (number % 5 === 0) {
    return "Buzz";
  }

  return number;
}

function generateFizzBuzz(limit) {
  const result = [];

  for (let i = 1; i <= limit; i++) {
    result.push(getFizzBuzz(i));
  }

  return result;
}

module.exports = {
  getFizzBuzz,
  generateFizzBuzz
};
