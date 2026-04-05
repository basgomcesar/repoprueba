import Cart from "../../src/domain/Cart";
import ProductRepository from "./ProductRepository";

export default class AddProductToCartUseCase {
  constructor(private readonly repository: ProductRepository) {}

  addToCart(idProduct: number, quantity: number, userId: number): Cart {

  }

}
