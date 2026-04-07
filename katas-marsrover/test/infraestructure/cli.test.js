const runCli = require('../../src/infraestructure/cli');

describe('CLI adaptadaor test', () => {
  it('ejecuta instrucciones y muestra resultado formateado', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    runCli(['node', 'app', 'MM']);

    expect(consoleSpy).toHaveBeenCalledWith('0:2:N');

    consoleSpy.mockRestore();
  });
  it('maneja instrucciones desconocidas lanzando error', () => {
    expect(() => runCli(['node', 'app', 'X'])).toThrow('Unknown instruction: X');
  });
  it('ejecuta hasta rebote y muestra resultado formateado', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    runCli(['node', 'app', 'MMMMMMMMMM']);

    expect(consoleSpy).toHaveBeenCalledWith('0:8:S');

    consoleSpy.mockRestore();
  });
});
