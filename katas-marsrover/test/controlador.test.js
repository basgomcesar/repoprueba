const Controlador = require('../app/controlador');
const SistemaRover = require('../app/sistema_rover');
const Direccion = require('../app/direccion');
describe("Controlador", () => {
  it("Se crea con un sistemaRover", () => {
    const sistemaRover = new SistemaRover();
    const controlador = new Controlador(sistemaRover);
    expect(controlador.sistemaRover).toBe(sistemaRover);
  });
  it("Ejecutar intruccion M deberia avanzar el sistema", () => {
    const sistemaRover = {
      avanzar: jest.fn(),
      obtenerPosicionX: jest.fn(),
      obtenerPosicionY: jest.fn(),
      obtenerDireccion: jest.fn()
    };
    const controlador = new Controlador(sistemaRover);
    //act
    controlador.ejecutar(["M"]);
    //assert
    expect(sistemaRover.avanzar).toHaveBeenCalled();
  });
  it("Ejecutar intruccion MM deberia avanzar el sistema dos veces", () => {
    const sistemaRover = {
      avanzar: jest.fn(),
      obtenerPosicionX: jest.fn(),
      obtenerPosicionY: jest.fn(),
      obtenerDireccion: jest.fn()
    };
    const controlador = new Controlador(sistemaRover);
    //act
    controlador.ejecutar(["M", "M"]);
    //assert
    expect(sistemaRover.avanzar).toHaveBeenCalledTimes(2);
  });
  it("Ejecutar devuelve la posicion final del rover", () => {
    const sistemaRover = new SistemaRover();
    const controlador = new Controlador(sistemaRover);
    //act
    const resultado = controlador.ejecutar(["M", "M"]);
    //assert
    expect(resultado).toEqual("0:2:N");
  });
  it("Ejecutar intruccion D deberia rotar derecha", () => {
    const sistemaRover = {
      avanzar: jest.fn(),
      obtenerPosicionX: jest.fn(),
      obtenerPosicionY: jest.fn(),
      obtenerDireccion: jest.fn(),
      rotarDerecha: jest.fn(),
      x: 0,
      y: 0,
      direccion: Direccion.NORTE
    };
    const controlador = new Controlador(sistemaRover);
    //act
    controlador.ejecutar(["D"]);
    //assert
    expect(sistemaRover.rotarDerecha).toHaveBeenCalled();
  });

});
