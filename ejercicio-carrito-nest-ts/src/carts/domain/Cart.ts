import { CartItem } from "./CartItem";
import { Product } from "../../products/domain/entities/Product";
import User from "../../users/domain/entities/User";

export default class Cart {

  private user: User;
  private cartItems: CartItem[] = [];
  private total: number = 0;

  constructor(user: User) {
    this.user = user;
    this.cartItems = [];
  }

  saveItemCart(newCartItem: CartItem) {
    const existingItemIndex = this.cartItems.findIndex(item => item.getProduct().getSKU() === newCartItem.getProduct().getSKU());
    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex] = newCartItem;
    } else {
      this.cartItems.push(newCartItem);
    }
  }
  verifyIfProductsInStock() {
    for (const item of this.cartItems) {
      const product = item.getProduct();
      if (!product || product.getStock() < item.getQuantity()) {
        throw new Error(`Stock insuficiente para el producto: ${product?.getName()}`);
      }
    }
  }

  addProduct(product: Product, quantity: number) {
    if (quantity <= 0) {
      throw new Error("Cantidad inválida");
    }
    this.cartItems.push(new CartItem(product, quantity));
    this.total += product.getPrice() * quantity;
  }
  
  setTotal(total: number) {
    this.total = total;
  }

  getTotal(): number {
    return this.total;
  }

  getItemCarts(): CartItem[] {
    return this.cartItems;
  }

  getUser(): User {
    return this.user;
  }

}
