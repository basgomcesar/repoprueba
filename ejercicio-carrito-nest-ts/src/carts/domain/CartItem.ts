import { Product } from "../../products/domain/entities/Product";
export class CartItem {

  private product: Product;
  private quantity: number;

  constructor(product: Product, quantity: number) {
    if (quantity <= 0) {
      throw new Error("Cantidad inválida");
    }
    this.product = product;
    this.quantity = quantity;
  }

  setQuantity(newQuantity: number) {
    if (newQuantity <= 0) {
      throw new Error("Cantidad inválida");
    }
    this.quantity = newQuantity;
  }

  getProduct(): Product {
    return this.product;
  }
  
  getQuantity(): number {
    return this.quantity;
  }
}
