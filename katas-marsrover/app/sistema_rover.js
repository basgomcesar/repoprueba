const Direccion = require('../app/direccion');
class SistemaRover {
  constructor() {
    this.posicionX = 0;
    this.posicionY = 0;
    this.direccion = Direccion.NORTE;
  }

  obtenerPosicionX() {
    return this.posicionX;
  }

  obtenerPosicionY() {
    return this.posicionY;
  }
  obtenerDireccion() {
    return this.direccion;
  }
}

module.exports = SistemaRover;
