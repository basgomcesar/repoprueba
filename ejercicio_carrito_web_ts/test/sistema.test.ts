import { describe,test,expect } from "@jest/globals";
import RepositorioProductos from "../app/repositorioProducto";
import SistemaCarrito from "../app/sistema";
import { Product } from "../src/domain/Product";

describe("Sistema", () => {
  test("Agrega un producto ", () => {
    const repositorioProductos: RepositorioProductos = {
      agregarProducto: jest.fn(),
      obtenerProductos: function (): unknown {
        return [];
      }
    };
    const sistemaCarrito = new SistemaCarrito(repositorioProductos);
    sistemaCarrito.agregarProducto(new Product(1, "Pan de molde", 100, 50));
    expect(repositorioProductos.agregarProducto).toHaveBeenCalledWith(new Product(1, "Pan de molde", 100, 50));});
});
