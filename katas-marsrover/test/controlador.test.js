const Controlador = require('../app/controlador');
const Rover = require('../src/domain/rover');
const Direction = require('../src/domain/direction');
describe("Controlador", () => {
  it("Se crea con un sistemaRover", () => {
    const rover = new Rover();
    const controlador = new Controlador(rover);
    expect(controlador.rover).toBe(rover);
  });
  it("Ejecutar intruccion M deberia avanzar el sistema", () => {
    const sistemaRover = {
      moveForward: jest.fn(),
      getPositionX: jest.fn(),
      getPositionY: jest.fn(),
      getDirection: jest.fn(),
      rotateRight: jest.fn(),
    };
    const controlador = new Controlador(sistemaRover);
    //act
    controlador.ejecutar(["M"]);
    //assert
    expect(sistemaRover.moveForward).toHaveBeenCalled();
  });
  it("Ejecutar intruccion MM deberia avanzar el sistema dos veces", () => {
    const sistemaRover = {
      moveForward: jest.fn(),
      getPositionX: jest.fn(),
      getPositionY: jest.fn(),
      getDirection: jest.fn()
    };
    const controlador = new Controlador(sistemaRover);
    //act
    controlador.ejecutar(["M", "M"]);
    //assert
    expect(sistemaRover.moveForward).toHaveBeenCalledTimes(2);
  });
  it("Ejecutar devuelve la posicion final del rover", () => {
    const sistemaRover = new Rover();
    const controlador = new Controlador(sistemaRover);
    //act
    const resultado = controlador.ejecutar(["M", "M"]);
    //assert
    expect(resultado).toEqual("0:2:N");
  });
  it("Ejecutar intruccion D deberia rotar derecha", () => {
    const sistemaRover = {
      moveForward: jest.fn(),
      getPositionX: jest.fn(),
      getPositionY: jest.fn(),
      getDirection: jest.fn(),
      rotateRight: jest.fn(),
      x: 0,
      y: 0,
      direccion: Direction.NORTH
    };
    const controlador = new Controlador(sistemaRover);
    //act
    controlador.ejecutar(["D"]);
    //assert
    expect(sistemaRover.rotateRight).toHaveBeenCalled();
  });

});
