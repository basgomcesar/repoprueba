const SistemaRover = require('../app/sistema_rover');
const Direccion = require('../app/direccion');

describe('SistemaRover', () => {
  it("Inicialmente esta en posición (0, 0) con dirección NORTE", () => {
    const sistemaRover = new SistemaRover();
    expect(sistemaRover.obtenerPosicionX()).toEqual(0);
    expect(sistemaRover.obtenerPosicionY()).toEqual(0);
  });

  it("Inicialmente la dirección es NORTE", () => {
    const sistemaRover = new SistemaRover();
    expect(sistemaRover.obtenerDireccion()).toEqual(Direccion.NORTE);
  });
});
