const Rover = require('../../src/domain/rover');
const Grid = require('../../src/domain/grid');
const Direction = require('../../src/domain/direction');
const executeRoverInstructions = require('../../src/application/executeRoverInstructions');

describe('executeRoverInstructions (application/use case)', () => {
  it('sin instrucciones, el rover no se mueve y regresa su posición inicial', () => {
    const rover = new Rover(new Grid(10));
    const result = executeRoverInstructions(rover, []);
    expect(result).toEqual({ x: 0, y: 0, direction: Direction.NORTH });
  });

  it('MM mueve el rover 2 pasos hacia adelante', () => {
    const rover = new Rover(new Grid(10));
    const result = executeRoverInstructions(rover, ['M', 'M']);
    expect(result).toEqual({ x: 0, y: 2, direction: Direction.NORTH });
  });

  it('D gira el rover a la derecha', () => {
    const rover = new Rover(new Grid(10));
    const result = executeRoverInstructions(rover, ['D']);
    expect(result).toEqual({ x: 0, y: 0, direction: Direction.EAST });
  });

  it('I gira el rover a la izquierda', () => {
    const rover = new Rover(new Grid(10));
    const result = executeRoverInstructions(rover, ['I']);
    expect(result).toEqual({ x: 0, y: 0, direction: Direction.WEST });
  });

  it('instrucción desconocida lanza error', () => {
    const rover = new Rover(new Grid(10));
    expect(() => executeRoverInstructions(rover, ['X'])).toThrow('Unknown instruction');
  });
});
