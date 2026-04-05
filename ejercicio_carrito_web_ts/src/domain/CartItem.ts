import { Product } from "./Product";

export class CartItem {
  setQuantity(newQuantity: number) {
    if (newQuantity <= 0) {
      throw new Error("Cantidad inválida");
    }
    this.quantity = newQuantity;
  }
  constructor(private product: Product, private quantity: number) {
    if (quantity <= 0) {
      throw new Error("Cantidad inválida");
    }
  }
  getProduct(): Product {
    return this.product;
  }
  getQuantity(): number {
    return this.quantity;
  }
}
