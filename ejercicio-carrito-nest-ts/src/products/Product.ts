
export class Product {

  private id: number;
  private name: string;
  private sku: string;
  private price: number;
  private stock: number;

  constructor(id: number, name: string, price: number, sku: string, stock: number) {
    if (price < 0) {
      throw new Error("El precio no puede ser negativo");
    }
    if (stock < 0) {
      throw new Error("El stock no puede ser negativo");
    }
    this.id = id;
    this.name = name;
    this.price = price;
    this.sku = sku;
    this.stock = stock;
  }
  
  setStock(stock: number): void {
    if (stock < 0) {
      throw new Error("El stock no puede ser negativo");
    }
    this.stock = stock;
  }

  setPrice(price: number): void {
    if (price < 0) {
      throw new Error("El precio no puede ser negativo");
    }
    this.price = price;
  }

  setName(name: string): void {
    this.name = name;
  }

  getSKU(): string {
    return this.sku;
  }

  getStock(): number {
    return this.stock;
  }

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }

  getId(): number {
    return this.id;
  }

}
