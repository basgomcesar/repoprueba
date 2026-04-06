import { PurchaseItem } from "../../src/domain/PurchaseItem";
import { PurchaseSummary } from "../../src/domain/PurchaseSummary";
import ProductRepository from "./ProductRepository";

export class CheckoutUseCase {

  private readonly repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  checkout(userId: number): PurchaseSummary {

    const user = this.repository.getUserById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const cart = this.repository.getCartByUserId(userId);
    const itemsCart = cart.getItemCarts();

    if (itemsCart.length === 0) {
      throw new Error("El carrito está vacío");
    }

    cart.verifyIfProductsInStock();

    //Logica para actualizar el stock de los productos en el repositorio
    for (const item of itemsCart) {
      const product = item.getProduct();
      const newStock = product.getStock() - item.getQuantity();
      product.setStock(newStock);
      this.repository.updateProduct(product);
    }

    const total = cart.getTotal();

    this.repository.clearCart(userId);

    return new PurchaseSummary(total, itemsCart, userId);
  }
}
