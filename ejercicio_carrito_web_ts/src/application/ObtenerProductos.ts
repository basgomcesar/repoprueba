import { Producto } from "app/producto";

export class ObtenerProductos {
    private productos: Producto[];

    constructor(productos: Producto[]) {
        this.productos = productos;
    }

  }
