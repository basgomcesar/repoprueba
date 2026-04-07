import { User } from "../../src/domain/User";
describe("Pruebas para la clase User", () => {
  it("Debería crear un usuario correctamente", () => {
    const user = new User(1, "Juan Pérez", "juan.pérez@example.com");
    expect(user.getId()).toBe(1);
  });
  it("Debería actualizar el nombre del usuario", () => {
    const user = new User(1, "Juan Pérez", "juan.perez@example.com");
    user.setName("Juan P.");
    expect(user.getName()).toBe("Juan P.");
  });
  it("Debería actualizar el correo electrónico del usuario", () => {
    const user = new User(1, "Juan Pérez", "juan.perez@example.com");
    user.setEmail("juan.p@ejemplo.com");
    expect(user.getEmail()).toBe("juan.p@ejemplo.com");
  });
});
