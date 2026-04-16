import User from "src/users/domain/entities/User";
import CartsRepository from "../application/CartsRepository";
import Cart from "../domain/Cart";

export default class InMemoryCarts implements CartsRepository {

    static carts: Cart[] = [];

    addProductToCart(user: User, productId: string, quantity: number): Cart {
        let cart = InMemoryCarts.carts.find(cart => cart.getUser().getPhone() === user.getPhone());
        if (!cart) {
            cart = new Cart(user);
            InMemoryCarts.carts.push(cart);
        }
        InMemoryCarts.carts.push(cart);
        return cart;
    }

    getCartByUser(user: User): Cart | null {
        const cart = InMemoryCarts.carts.find(cart => cart.getUser().getPhone() === user.getPhone());
        return cart || null;
    }

    saveCart(cart: Cart): Cart {
        const existingCartIndex = InMemoryCarts.carts.findIndex(c => c.getUser().getPhone() === cart.getUser().getPhone());
        if (existingCartIndex !== -1) {
            InMemoryCarts.carts[existingCartIndex] = cart;
        } else {
            InMemoryCarts.carts.push(cart);
        }
        return cart;
    }

    clearCart(user: User): void {
        InMemoryCarts.carts = InMemoryCarts.carts.filter(cart => cart.getUser().getPhone() !== user.getPhone());
    }
}