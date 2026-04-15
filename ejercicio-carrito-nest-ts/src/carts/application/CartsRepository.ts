import User from "src/users/domain/entities/User";
import Cart from "../domain/Cart";

export default interface CartsRepository {
    saveCart(cart: Cart): Cart;
    getCartByUser(user: User): Cart | null;
    addProductToCart(user: User, productId: string, quantity: number): Cart;
}
