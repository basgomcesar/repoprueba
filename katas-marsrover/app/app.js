
const instrucciones = process.argv[2];
const Controlador = require('./controlador');
const SistemaRover = require('./sistema_rover');
const sistemaRover = new SistemaRover();
const controlador = new Controlador(sistemaRover);
const resultado = controlador.ejecutar(instrucciones.split(""));
console.log(resultado);
