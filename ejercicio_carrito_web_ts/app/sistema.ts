import { Producto } from "./producto";
import RepositorioProductos from "./repositorioProducto";

export default class SistemaCarrito {
  obtenerProductos() {
    return this.repositorioProductos.obtenerProductos();
  }
  private repositorioProductos: RepositorioProductos;
  agregarProducto(producto: Producto) {
    this.repositorioProductos.agregarProducto(producto);

  }

  constructor(repositorioProductos: RepositorioProductos) {
    this.repositorioProductos = repositorioProductos;
  }
}
