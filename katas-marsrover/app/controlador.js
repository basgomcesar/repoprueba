class Controlador {
  constructor(rover) {
    this.rover = rover;
  }
  ejecutar(instrucciones) {
    instrucciones.forEach(instruccion => {
      if (instruccion === "M") {
        this.rover.moveForward();
      } else if (instruccion === "D") {
        this.rover.rotateRight();
      }
    });
    const direccion = this.rover.getDirection()?.charAt(0).toUpperCase();
    return `${this.rover.getPositionX()}:${this.rover.getPositionY()}:${direccion}`;
  }
}

module.exports = Controlador;
