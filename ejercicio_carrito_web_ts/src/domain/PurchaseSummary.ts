import { PurchaseItem } from "./PurchaseItem";

export class PurchaseSummary {
  constructor(private total:number,private  items: PurchaseItem[],private userId: number) {}
  
  getTotal(): number {
    return this.total;
  }
  getItems(): PurchaseItem[] {
    return this.items;
  }
  getUserId(): number {
    return this.userId;
  }

}
