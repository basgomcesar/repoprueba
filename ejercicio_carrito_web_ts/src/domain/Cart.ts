import { CartItem } from "./CartItem";
import { Product } from "./Product";
import { User } from "./User";

export default class Cart {
  addProduct(product: Product, quantity: number) {
    if (quantity <= 0) {
      throw new Error("Cantidad inválida");
    }
    this.cartItems.push(new CartItem(product, quantity));
    this.total += product.getPrice() * quantity;
  }
  constructor(user: User) {
    this.user = user;
    this.cartItems = [];
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
  private user: User;
  private cartItems: CartItem[] = [];
  private total: number = 0;


}
