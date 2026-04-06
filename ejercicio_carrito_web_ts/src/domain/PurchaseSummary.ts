import { CartItem } from "./CartItem";
import { PurchaseItem } from "./PurchaseItem";

export class PurchaseSummary {

  private total: number;
  private items: CartItem[];
  private userId: number;

  constructor(total: number, items: CartItem[], userId: number) {
    this.total = total;
    this.items = items;
    this.userId = userId;
  }

  getTotal(): number {
    return this.total;
  }

  getUserId(): number {
    return this.userId;
  }

  getItems(): PurchaseItem[] {
    return this.items.map(item => {
      const product = item.getProduct();
      return new PurchaseItem(
        product.getId(),
        product.getName(),
        product.getPrice(),
        item.getQuantity()
      );
    });
  }

}
