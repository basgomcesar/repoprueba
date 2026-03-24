const Rover = require('../../src/domain/rover');
const Grid = require('../../src/domain/grid');


describe('Rover ', () => {
  it('empieza en (0,0) mirando al NORTE', () => {
    const rover = new Rover(new Grid(10));
    expect(rover.getPositionX()).toBe(0);
    expect(rover.getPositionY()).toBe(0);
    expect(rover.getDirection()).toBe('N');
  });

  it('mueve hacia adelante', () => {
    const rover = new Rover(new Grid(10));
    rover.rotateRight(); 
    rover.moveForward();
    expect(rover.getPositionX()).toBe(1);
    expect(rover.getPositionY()).toBe(0);
  });

  it('gira a la derecha', () => {
    const rover = new Rover(new Grid(10));
    rover.rotateRight(); 
    expect(rover.getDirection()).toBe('E');
  });
});
describe('Rover - rebota en los bordes del grid y cambia de dirección', () => {
  it('en el borde norte: desde y=0 mirando NORTE, M => y=1 mirando SUR', () => {
    const rover = new Rover(new Grid(10));

    for (let i = 0; i < 9; i++) rover.moveForward();
    expect(rover.getPositionY()).toBe(9);
    expect(rover.getDirection()).toBe('N');

    rover.moveForward(); 

    expect(rover.getPositionY()).toBe(8);
    expect(rover.getDirection()).toBe('S');
  });

  it('en el borde oeste: desde x=0 mirando WEST, M => x=1 mirando EAST', () => {
    const rover = new Rover(new Grid(10));

    rover.rotateRight();
    rover.rotateRight();
    rover.rotateRight();
    expect(rover.getDirection()).toBe('W');

    rover.moveForward(); 

    expect(rover.getPositionX()).toBe(1);
    expect(rover.getDirection()).toBe('E');
  });
});
