import { CartItem } from "../../carts/domain/CartItem";

export default class Order {
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

    getItems(): CartItem[] {
        return this.items;
    }
}