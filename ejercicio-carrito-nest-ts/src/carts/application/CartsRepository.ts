import User from "src/users/domain/entities/User";
import Cart from "../domain/Cart";

export default interface CartsRepository {
    clearCart(user: User): void;
    saveCart(cart: Cart): Cart;
    getCartByUser(user: User): Cart | null;
    addProductToCart(user: User, productId: string, quantity: number): Cart;
}
