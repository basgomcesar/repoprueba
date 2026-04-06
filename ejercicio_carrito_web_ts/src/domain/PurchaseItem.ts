export class PurchaseItem {

  private productId: number;
  private name: string;
  private price: number;
  private quantity: number;
  private subtotal: number;

  constructor(productId: number, name: string, price: number, quantity: number) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.subtotal = price * quantity;
  }

  getProductId(): number {
    return this.productId;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getSubtotal(): number {
    return this.subtotal;
  }
  
}
