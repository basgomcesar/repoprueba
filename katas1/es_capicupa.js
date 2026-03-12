const entrada = process.argv[2];

if (isNaN(Number(entrada))) {
  console.log("No es un número válido.");
} else {
  imprimirCapicua(entrada);
}

function imprimirCapicua(numero) {
  const reversa = invertirNumero(numero);

  if (numero === reversa) {
    console.log(`${numero} es capicua`);
  } else {
    console.log(`${numero} no es capicua`);
  }
}

function invertirNumero(numero) {
  return numero.split("").reverse().join("");
}
