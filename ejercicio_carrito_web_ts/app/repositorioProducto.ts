import { Producto } from "./producto";
import { ProductoYaExisteError } from "./productoyaexiste";

export default interface RepositorioProductos {
  obtenerProductos(): unknown;
  agregarProducto(producto: Producto): Producto;

}

export class RepositorioProductosEnMemoria implements RepositorioProductos {
 //Inicializa con un array con un producto para probar el error de producto ya existente
  static productos: Producto[] = [new Producto(1, "Pan de molde", 100, 50)];
  obtenerProductos() {
    return RepositorioProductosEnMemoria.productos;
  }
  agregarProducto(producto: Producto): Producto {
    if (RepositorioProductosEnMemoria.productos.find((p) => p.getId() === producto.getId())) {
      throw new ProductoYaExisteError("El producto ya existe en el repositorio");
    }
    RepositorioProductosEnMemoria.productos.push(producto);
    return producto;
  }
}
