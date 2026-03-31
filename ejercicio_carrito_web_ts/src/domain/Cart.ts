import { Product } from "./Product";
import { User } from "./User";

export default class Cart {
  constructor(user: User) {
    this.user = user;
    this.products = [];
  }
  getTotal(): number {
    return this.total;
  }
  getProducts(): Product[] {
    return this.products;

  }
  getUser(): User {
    return this.user;
  }
  private user: User;
  private products: Product[];
  private total: number = 0;


}
