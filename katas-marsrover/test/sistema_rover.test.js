const Rover = require('../src/domain/rover');
const Grid = require('../src/domain/grid');

describe('Rover', () => {
  it("Inicialmente esta en posición (0, 0) con dirección NORTH", () => {
    const rover = new Rover(new Grid(10));
    expect(rover.getPositionX()).toEqual(0);
    expect(rover.getPositionY()).toEqual(0);
  });

  it("Inicialmente la dirección es NORTH", () => {
    const rover = new Rover(new Grid(10));
    expect(rover.getDirection()).toEqual('N');
  });
  it("avanzar incrementa y cuando direccion norte", () => {
    const rover = new Rover(new Grid(10));
    rover.moveForward();
    expect(rover.getPositionY()).toEqual(1);
  });
  it("avanzar en sur causa rebote y cambio a norte", () => {
    const rover = new Rover(new Grid(10));
    rover.rotateRight();
    rover.rotateRight();
    rover.moveForward();
    expect(rover.getPositionY()).toEqual(1);
    expect(rover.getDirection()).toEqual('N');

  });
  it("rotarDerecha cambia la dirección de NORTE a ESTE", () => {
    const rover = new Rover(new Grid(10));
    rover.rotateRight();
    expect(rover.getDirection()).toEqual('E');
  });
});
