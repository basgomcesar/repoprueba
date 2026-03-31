export class Product {
  constructor(id: number, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
  setStock(stock: number): void {
    this.stock = stock;
  }
  setPrice(price: number): void {
    this.price = price;
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
  private id: number;
  private name: string;
  private price: number;
  private stock: number;

}
