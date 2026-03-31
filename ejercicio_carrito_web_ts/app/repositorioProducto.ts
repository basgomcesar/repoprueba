import { Product } from "../src/domain/Product";
import { ProductoYaExisteError } from "./productoyaexiste";

export default interface RepositorioProductos {
  obtenerProductos(): unknown;
  agregarProducto(producto: Product): Product;

}

export class RepositorioProductosEnMemoria implements RepositorioProductos {
 //Inicializa con un array con un producto para probar el error de producto ya existente
  static productos: Product[] = [new Product(1, "Pan de molde", 100, 50)];
  obtenerProductos() {
    return RepositorioProductosEnMemoria.productos;
  }
  agregarProducto(producto: Product): Product {
    if (RepositorioProductosEnMemoria.productos.find((p) => p.getId() === producto.getId())) {
      throw new ProductoYaExisteError("El producto ya existe en el repositorio");
    }
    RepositorioProductosEnMemoria.productos.push(producto);
    return producto;
  }
}
