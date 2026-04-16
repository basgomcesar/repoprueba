import { CartItem } from "../../carts/domain/CartItem";

export default class Order {
    private id: string;
    private total: number;
    private items: CartItem[];
    private userId: string;

    constructor(id: string, total: number, items: CartItem[], userId: string) {
        this.id = id;
        this.total = total;
        this.items = items;
        this.userId = userId;
    }

    getTotal(): number {
        return this.total;
    }

    getUserId(): string {
        return this.userId;
    }

    getItems(): CartItem[] {
        return this.items;
    }
}