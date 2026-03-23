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
  avanzar() {
    if (this.direccion === Direccion.NORTE) {
      this.posicionY += 1;
    } else if (this.direccion === Direccion.SUR) {
      this.posicionY -= 1;
    } else if (this.direccion === Direccion.ESTE) {
      this.posicionX += 1;
    } else if (this.direccion === Direccion.OESTE) {
      this.posicionX -= 1;
    }
  }
}

module.exports = SistemaRover;
