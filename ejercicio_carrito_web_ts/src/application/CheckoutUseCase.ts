import { PurchaseItem } from "../../src/domain/PurchaseItem";
import { PurchaseSummary } from "../../src/domain/PurchaseSummary";
import ProductRepository from "./ProductRepository";

export class CheckoutUseCase {
  constructor(private readonly repository: ProductRepository) {}

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

    
    for (const item of itemsCart) {
      const product = item.getProduct();
      if (!product || product.getStock() < item.getQuantity()) {
        throw new Error(`Stock insuficiente para el producto: ${product?.getName()}`);
      }
    }

   
    let total = 0;
    for (const item of itemsCart) {
      const product = item.getProduct();
      const quantity = item.getQuantity();
      product.setStock(product.getStock() - quantity);
      this.repository.updateProduct(product);
      total += product.getPrice() * quantity;
    }

    
    this.repository.clearCart(userId);

    
    const purchaseItems:PurchaseItem[] = itemsCart.map(item => {
      const product = item.getProduct();
      return new PurchaseItem(
        product.getId(),
        product.getName(),
        product.getPrice(),
        item.getQuantity()
      );
    });
    return new PurchaseSummary(total, purchaseItems, userId);
  }
}
