import { Product } from "../../src/domain/Product";
import Cart from "../../src/domain/Cart";
import ProductRepository from "./ProductRepository";
import { User } from "../../src/domain/User";
import { CartItem } from "../../src/domain/CartItem";

export default class AddProductToCartUseCase {
  private readonly repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  addToCart(idProduct: number, quantity: number, userId: number): Cart {
    const product = this.getProductOrThrow(idProduct);
    const user = this.getUserOrThrow(userId);

    const cart = this.getOrCreateCart(userId, user);

    const item = this.findCartItem(cart, idProduct);
    const finalQuantity = (item?.getQuantity() ?? 0) + quantity;

    this.ensureStock(product, finalQuantity);

    if (item) item.setQuantity(finalQuantity);
    else cart.addProduct(product, quantity);

    this.repository.saveCart(cart);
    return cart;
  }

  private getOrCreateCart(userId: number, user: User): Cart {
    return this.repository.getCartByUserId(userId) ?? new Cart(user);
  }

  private findCartItem(cart: Cart, idProduct: number): CartItem | undefined {
    return cart.getItemCarts().find(i => i.getProduct().getId() === idProduct);
  }

  private getProductOrThrow(idProduct: number): Product {
    const product = this.repository.getProductById(idProduct);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  private getUserOrThrow(userId: number): User {
    const user = this.repository.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  private ensureStock(product: Product, requestedQuantity: number) {
    if (product.getStock() < requestedQuantity) {
      throw new Error("Stock insuficiente para la cantidad solicitada");
    }
  }
}
