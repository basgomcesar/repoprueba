import ExecuteRoverInstructions from "../../src/application/ExecuteRoverInstructions";
import { Direction } from "../../src/domain/Direction";
import Grid from "../../src/domain/Grid";
import Rover from "../../src/domain/Rover";
describe("Escenarios para ejecutar instrucciones del rover", () => {
  test("El rover se mueve hacia adelante", () => {
    const instructions = ["M"]; 
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    const executeRoverInstructions = new ExecuteRoverInstructions(rover, instructions);
    executeRoverInstructions.execute();
    expect(rover.getPositionY()).toEqual(1);
  });
    test("El rover gira a la derecha", () => {
    const instructions = ["R"]; 
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    const executeRoverInstructions = new ExecuteRoverInstructions(rover, instructions);
    executeRoverInstructions.execute();
    expect(rover.getDirection()).toEqual(Direction.EAST);
  });
  test("El rover ejecuta MMMMMM ", () => {
    const instructions = ["M", "M", "M", "M", "M", "M"]; 
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    const executeRoverInstructions = new ExecuteRoverInstructions(rover, instructions);
    executeRoverInstructions.execute();
    expect(rover.getPositionY()).toEqual(6);
  });
});
