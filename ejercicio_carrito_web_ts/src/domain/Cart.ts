import { CartItem } from "./CartItem";
import { Product } from "./Product";
import { User } from "./User";

export default class Cart {

  private user: User;
  private cartItems: CartItem[] = [];
  private total: number = 0;

  constructor(user: User) {
    this.user = user;
    this.cartItems = [];
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
