import { Product } from "../src/domain/Product";
import RepositorioProductos from "./repositorioProducto";

export default class SistemaCarrito {
  obtenerProductos() {
    return this.repositorioProductos.obtenerProductos();
  }
  private repositorioProductos: RepositorioProductos;
  agregarProducto(producto: Product) {
    this.repositorioProductos.agregarProducto(producto);

  }

  constructor(repositorioProductos: RepositorioProductos) {
    this.repositorioProductos = repositorioProductos;
  }
}
