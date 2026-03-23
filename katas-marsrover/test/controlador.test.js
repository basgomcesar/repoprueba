const Controlador = require('../app/controlador');
const SistemaRover = require('../app/sistema_rover');
describe("Controlador", () => {
  it("Se crea con un sistemaRover", () => {
    const sistemaRover = new SistemaRover();
    const controlador = new Controlador(sistemaRover);
    expect(controlador.sistemaRover).toBe(sistemaRover);
  });
});
