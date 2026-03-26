import executeRoverInstructions from "../../src/application/ExecuteRoverInstructions";
import { Direction } from "../../src/domain/Direction";
import Grid from "../../src/domain/Grid";
import Rover from "../../src/domain/Rover";
describe("Escenarios para ejecutar instrucciones del rover", () => {
  test("El rover se mueve hacia adelante", () => {
    const instructions = ["M"];
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    executeRoverInstructions(rover, instructions);
    expect(rover.getPositionY()).toEqual(1);
  });
  test("El rover gira a la derecha", () => {
    const instructions = ["D"];
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    executeRoverInstructions(rover, instructions);
    expect(rover.getDirection()).toEqual(Direction.EAST);
  });
  test("El rover gira a la izquierda", () => {
    const instructions = ["I"];
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    executeRoverInstructions(rover, instructions);
    expect(rover.getDirection()).toEqual(Direction.WEST);
  });
  test("El rover ejecuta MMMMMM ", () => {
    const instructions = ["M", "M", "M", "M", "M", "M"];
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    executeRoverInstructions(rover, instructions);
    expect(rover.getPositionY()).toEqual(6);
  });
  test("El rover llega al borde del grid", () => {
    const instructions = ["M", "M", "M", "M", "M", "M", "M", "M", "M", "M"];
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    executeRoverInstructions(rover, instructions);
    expect(rover.getPositionY()).toEqual(9);
  });
});
describe("Escenarios para condicion de rebote del rover", () => {
  test("El rover rebota al intentar moverse fuera del grid, regresa a la posicion anterior", () => {
    const instructions = [
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
    ];
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    executeRoverInstructions(rover, instructions);
    expect(rover.getPositionY()).toEqual(8);
  });
  test("El rover rebota al intentar moverse fuera del grid, cambia su direccion", () => {
    const instructions = [
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
      "M",
    ];
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    executeRoverInstructions(rover, instructions);
    expect(rover.getDirection()).toEqual(Direction.SOUTH);
  });
});
