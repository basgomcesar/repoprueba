import { Product } from "./Product";
import { User } from "./User";

export default class Cart {
  private user: User;
  private products: Product[];
  private total: number = 0;
  constructor(user: User) {
    this.user = user;
    this.products = [];
  }
  
}
