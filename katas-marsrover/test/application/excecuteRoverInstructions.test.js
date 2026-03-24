const Rover = require('../../src/domain/rover');
const Direction = require('../../src/domain/direction');
const executeRoverInstructions = require('../../src/application/executeRoverInstructions');

describe('executeRoverInstructions (application/use case)', () => {
  it('sin instrucciones, el rover no se mueve y regresa su posición inicial', () => {
    const rover = new Rover();
    const result = executeRoverInstructions(rover, []);
    expect(result).toEqual({ x: 0, y: 0, direction: 'N' });
  });

  it('MM mueve el rover 2 pasos hacia adelante', () => {
    const rover = new Rover();
    const result = executeRoverInstructions(rover, ['M', 'M']);
    expect(result).toEqual({ x: 0, y: 2, direction: 'N' });
  });

  it('D gira el rover a la derecha', () => {
    const rover = new Rover();
    const result = executeRoverInstructions(rover, ['D']);
    expect(result).toEqual({ x: 0, y: 0, direction: 'E' });
  });

  it('I gira el rover a la izquierda', () => {
    const rover = new Rover();
    const result = executeRoverInstructions(rover, ['I']);
    expect(result).toEqual({ x: 0, y: 0, direction: 'W' });
  });

  it('instrucción desconocida lanza error', () => {
    const rover = new Rover();
    expect(() => executeRoverInstructions(rover, ['X'])).toThrow('Unknown instruction');
  });
});
