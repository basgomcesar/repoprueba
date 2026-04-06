import Cart from "../../src/domain/Cart";
import { Product } from "../../src/domain/Product";
import { User } from "./../../src/domain/User";

export default interface ProductRepository {
  clearCart(userId: number): boolean;
  saveCart(cart: Cart): Cart;
  getCartByUserId(userId: number): Cart;
  getAllProducts(): Product[];
  findProductById(idProduct: number): boolean;
  getProductById(idProduct: number): Product;
  updateProduct(product: Product): void;
  saveProduct(product: Product): Product;
  getUserById(idUser: number): User;
}
