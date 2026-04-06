import Cart from "../../src/domain/Cart";
import ProductRepository from "../../src/application/ProductRepository";
import { Product } from "../../src/domain/Product";
import { User } from "../../src/domain/User";

export default class InMemoryProductRepository implements ProductRepository {
  static products: Product[] = [];
  static users: User[] = [
    new User(1, "Juan Perez", "juan@example.com"),
    new User(2, "Maria Gomez", "maria@example.com")
  ];
  static carts: Cart[] = [];

  clearCart(userId: number): boolean {
    const cartIndex = InMemoryProductRepository.carts.findIndex(c => c.getUser().getId() === userId);
    if (cartIndex !== -1) {
      InMemoryProductRepository.carts.splice(cartIndex, 1);
      return true;
    }
    return false;
  }

  saveCart(cart: Cart): Cart {
    const existingCartIndex = InMemoryProductRepository.carts.findIndex(c => c.getUser().getId() === cart.getUser().getId());
    if (existingCartIndex !== -1) {
      InMemoryProductRepository.carts[existingCartIndex] = cart;
    } else {
      InMemoryProductRepository.carts.push(cart);
    }
    return cart;
  }

  getCartByUserId(userId: number): Cart {
    const cart = InMemoryProductRepository.carts.find(c => c.getUser().getId() === userId);
    if (!cart) {
      return new Cart(this.getUserById(userId));
    }
    return cart;
  }

  getUserById(idUser: number): User {
    const user = InMemoryProductRepository.users.find(u => u.getId() === idUser);
    if (!user) {
      throw new Error(`Usuario con id ${idUser} no encontrado`);
    }
    return user;
  }

  getProductById(idProduct: number): Product {
    const product = InMemoryProductRepository.products.find(p => p.getId() === idProduct);
    if (!product) {
      throw new Error(`Producto con id ${idProduct} no encontrado`);
    }
    return product;
  }

  updateProduct(product: Product): void {
    const index = InMemoryProductRepository.products.findIndex(p => p.getId() === product.getId());
    if (index !== -1) {
      InMemoryProductRepository.products[index] = product;
    }
  }

  getAllProducts(): Product[] {
    const products = InMemoryProductRepository.products;
    return products;
  }

  findProductById(idProduct: number): boolean {
    return InMemoryProductRepository.products.find(p => p.getId() === idProduct) === undefined ? false : true;
  }

  saveProduct(product: Product): Product {
    InMemoryProductRepository.products.push(product);
    return product;
  }
}
