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
  rotarDerecha() {
    if (this.direccion === Direccion.NORTE) {
      this.direccion = Direccion.ESTE;
    } else if (this.direccion === Direccion.ESTE) {
      this.direccion = Direccion.SUR;
    } else if (this.direccion === Direccion.SUR) {
      this.direccion = Direccion.OESTE;
    } else if (this.direccion === Direccion.OESTE) {
      this.direccion = Direccion.NORTE;
    }
  }

}

module.exports = SistemaRover;
