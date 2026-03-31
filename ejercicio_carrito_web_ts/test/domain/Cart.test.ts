import Cart from "../../src/domain/Cart";
import { User } from "../../src/domain/User";

describe("Cart", () => {
  it("Se debe crear un carrito con un usuario", () => {
    const user = new User(1, "Juan Pérez", "juan.perez@example.com");
    const cart = new Cart(user);
    expect(cart).toBeInstanceOf(Cart);
  });
  it("El carrito debe tener un usuario asociado", () => {
    const user = new User(1, "Juan Pérez", "juan.perez@example.com");
    const cart = new Cart(user);
    expect(cart.getUser()).toBe(user);
  });
  it("El carrito se inicializa con un array vacío de productos", () => {
    const user = new User(1, "Juan Pérez", "juan.perez@example.com");
    const cart = new Cart(user);
    expect(cart.getProducts()).toEqual([]);
  });

});
