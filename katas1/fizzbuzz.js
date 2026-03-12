const primerArgumento = process.argv[2];

//los múltiplos de 3 deben imprimir "Fizz"
//los múltiplos de 5 deben imprimer "Buzz"
//los múltiplos de tres y cinco deben imprimer "FizzBuzz"
if (isNaN(primerArgumento)) {
  console.log("No es un numero valido.");
} else {
  imprimirMultiplos(primerArgumento);
}

function imprimirMultiplos(limite) {
  for (let i = 1; i <= limite; i++) {
    if (i % 5 === 0 && i % 3 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}


