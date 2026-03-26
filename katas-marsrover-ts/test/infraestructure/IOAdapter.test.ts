import runCli from "../../src/infrastructure/IOAdapter";

describe("IOAdapter tests para validar la integración de la clase IOAdapter con ExecuteRoverInstructions, Rover, Grid y Direction", () => {
  test("Debería ejecutar las instrucciones correctamente y devolver la posición final del rover", () => {
    const output = runCli(["yarn", "start", "MMDMMDMM"]);
    expect(output).toBe("2:0:S");
  });
  test("Debería manejar instrucciones invalidas y devolver el mensaje de error", () => {
    const output = runCli(["yarn", "start", "MMXMMRMM"]);
    expect(output).toBe("Instrucción inválida: X");
  });
  test("Debería manejar el caso de no recibir instrucciones y devolver la posición inicial del rover", () => {
    const output = runCli(["yarn", "start"]);
    expect(output).toBe("0:0:N");
  });
  test("Debería manejar el caso de rebote al intentar moverse fuera de los límites del grid y devolver la posición y dirección correctas", () => {
    const output = runCli(["yarn", "start", "MMMMMMMMMMM"]);
    expect(output).toBe("0:8:S");
  });
});
