import Cart from "../../src/domain/Cart";
import ProductRepository from "./ProductRepository";

export default class AddProductToCartUseCase {
  constructor(private readonly repository: ProductRepository) {}

  addToCart(idProduct: number, quantity: number, userId: number): Cart {
    const product = this.repository.getProductById(idProduct);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    if (product.getStock() < quantity) {
      throw new Error("Stock insuficiente");
    }

    const user = this.repository.getUserById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const cart = this.repository.getCartByUserId(userId) || new Cart(user);
    const existingCartItem = cart.getItemCarts().find(item => item.getProduct().getId() === idProduct);
    if (existingCartItem) {
      const newQuantity = existingCartItem.getQuantity() + quantity;
      if (newQuantity > product.getStock()) {
        throw new Error("Stock insuficiente para la cantidad solicitada");
      }
      existingCartItem.setQuantity(newQuantity);
      this.repository.saveCart(cart);
      return cart;
    }
    cart.addProduct(product, quantity);
    this.repository.saveCart(cart);
    return cart;
  }

}
