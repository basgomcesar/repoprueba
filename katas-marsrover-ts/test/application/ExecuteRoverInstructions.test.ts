describe("Escenarios para ejecutar instrucciones del rover", () => {
  test("El rover gira a la derecha", () => {
    const instructions = ["R"]; 
    const Grid = new Grid(10, 10);
    const Rover = new Rover(Grid);
    const ExecuteRoverInstructions = new ExecuteRoverInstructions(Rover, instructions);
    ExecuteRoverInstructions.execute();
    expect(Rover.getDirection()).toEqual("E");
  });
  test("El rover se mueve hacia adelante", () => {
    const instructions = ["M"]; 
    const Grid = new Grid(10, 10);
    const Rover = new Rover(Grid);
    const ExecuteRoverInstructions = new ExecuteRoverInstructions(Rover, instructions);
    ExecuteRoverInstructions.execute();
    expect(Rover.getPositionY()).toEqual(1);

  });

});
