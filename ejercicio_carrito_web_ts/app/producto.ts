export class Producto {
    constructor(id: number, nombre: string, precio: number, stock: number) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
  getStock(): number {
    return this.stock;
  }
  getPrecio(): number {
    return this.precio;
  }
  getNombre(): string {
    return this.nombre;
  }
  getId(): number {
    return this.id;
  }
  private id: number;
  private nombre: string;
  private precio: number;
  private stock: number;


}
