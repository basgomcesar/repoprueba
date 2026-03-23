
const instrucciones = process.argv.slice(2).join(' ');
const sistemaRover = new SistemaRover();
const controlador = new Controlador(sistemaRover);
const resultado = controlador.ejecutar(instrucciones);
console.log(resultado);
