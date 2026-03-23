
const instrucciones = process.argv[2];
const Controlador = require('./controlador');
const Rover = require('./domain/rover');
const sistemaRover = new Rover();
const controlador = new Controlador(sistemaRover);
const resultado = controlador.ejecutar(instrucciones.split(""));
console.log(resultado);
