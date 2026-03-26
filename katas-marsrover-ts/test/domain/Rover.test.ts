describe("Escenarios para el rover", () => {
  test("El rover inicia en la posición 0 en X", () => {
    const Grid = new Grid(10, 10);
    const Rover = new Rover(Grid);
    expect(Rover.getPositionX()).toEqual(0);
  });
  test("El rover inicia en la posición 0 en Y", () => {
    const Grid = new Grid(10, 10);
    const Rover = new Rover(Grid);
    expect(Rover.getPositionY()).toEqual(0);
  });
  test("El rover inicia mirando hacia el norte", () => {
    const Grid = new Grid(10, 10);
    const Rover = new Rover(Grid);
    expect(Rover.getDirection()).toEqual("N");
  });
});
