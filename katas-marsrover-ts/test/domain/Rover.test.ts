import Grid from "../../src/domain/Grid";
import Rover from "../../src/domain/Rover";
import { Direction } from "../../src/domain/Direction";

describe("Escenarios para el rover", () => {
  test("El rover inicia en la posición 0 en X", () => {
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    expect(rover.getPositionX()).toEqual(0);
  });
  test("El rover inicia en la posición 0 en Y", () => {
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    expect(rover.getPositionY()).toEqual(0);
  });
  test("El rover inicia mirando hacia el norte", () => {
    const grid = new Grid(10, 10);
    const rover = new Rover(grid);
    expect(rover.getDirection()).toEqual(Direction.NORTH);
  });
});
