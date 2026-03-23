const Direccion = require('./direccion');
const SistemaRover = require('./sistema_rover');
class Controlador {
  constructor(sistemaRover) {
    this.sistemaRover = sistemaRover;
  }
  ejecutar(instrucciones) {
    instrucciones.forEach(instruccion => {
      if (instruccion === "M") {
        this.sistemaRover.avanzar();
      } else if (instruccion === "D") {
        this.sistemaRover.rotarDerecha();
      }
    });
    const direccion = this.sistemaRover.obtenerDireccion()?.charAt(0).toUpperCase();
    return `${this.sistemaRover.obtenerPosicionX()}:${this.sistemaRover.obtenerPosicionY()}:${direccion}`;
  }
}

module.exports = Controlador;
