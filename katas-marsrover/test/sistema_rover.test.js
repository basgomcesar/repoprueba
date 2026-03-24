const Rover = require('../src/domain/rover');
const Direction = require('../src/domain/direction');

describe('Rover', () => {
  it("Inicialmente esta en posición (0, 0) con dirección NORTH", () => {
    const rover = new Rover();
    expect(rover.getPositionX()).toEqual(0);
    expect(rover.getPositionY()).toEqual(0);
  });

  it("Inicialmente la dirección es NORTH", () => {
    const rover = new Rover();
    expect(rover.getDirection()).toEqual(Direction.NORTH);
  });
  it("avanzar incrementa y cuando direccion norte", () => {
    const rover = new Rover();
    rover.moveForward();
    expect(rover.getPositionY()).toEqual(1);
  });
  it("avanzar en sur causa rebote y cambio a norte", () => {
    const rover = new Rover();
    rover.rotateRight();
    rover.rotateRight();
    rover.moveForward();
    expect(rover.getPositionY()).toEqual(1);
    expect(rover.getDirection()).toEqual(Direction.NORTH);

  });
  it("rotarDerecha cambia la dirección de NORTE a ESTE", () => {
    const rover = new Rover();
    rover.rotateRight();
    expect(rover.getDirection()).toEqual(Direction.EAST);
  });
});
