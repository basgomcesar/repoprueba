import { describe,test,expect } from "@jest/globals";
import RepositorioProductos from "../app/repositorioProducto";
import SistemaCarrito from "../app/sistema";
import { Producto } from "../app/producto";

describe("Sistema", () => {
  test("Agrega un producto ", () => {
    const repositorioProductos: RepositorioProductos = {
      agregarProducto: jest.fn(),
      obtenerProductos: function (): unknown {
        return [];
      }
    };
    const sistemaCarrito = new SistemaCarrito(repositorioProductos);
    sistemaCarrito.agregarProducto(new Producto(1, "Pan de molde", 100, 50));
    expect(repositorioProductos.agregarProducto).toHaveBeenCalledWith(new Producto(1, "Pan de molde", 100, 50));});
});
