const runCli = require('../../src/infraestructure/cli');

describe('CLI adaptadaor test', () => {
  it('lee las instrucciones, ejecuta el caso de uso y muestra el resultado', () => {
    const createRover = jest.fn(() => ({ x: 0, y: 0, direction: 'NORTH' }));
    const execute = jest.fn(() => ({ x: 0, y: 2, direction: 'NORTH' }));
    const presenter = jest.fn(() => '0:2:N');
    const output = { log: jest.fn() };

    runCli(['node', 'app', 'MM'], { createRover, execute, presenter, output });

    expect(execute).toHaveBeenCalledWith(expect.anything(), ['M', 'M']);
    expect(output.log).toHaveBeenCalledWith('0:2:N');
  });
});
