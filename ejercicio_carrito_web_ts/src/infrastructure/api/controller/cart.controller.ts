import Cart from "../../../../src/domain/Cart";
import AddProductToCartUseCase from "../../../../src/application/AddProductToCartUseCase";
import { Request, Response } from "express";
import { CheckoutUseCase } from "../../../application/CheckoutUseCase";

export class CartController {
  constructor(private readonly addProductToCartUseCase: AddProductToCartUseCase,
    private readonly checkoutUseCase: CheckoutUseCase
  ) {}

  addToCart(req: Request, res: Response) {
    try {
      const { productId, quantity, userId } = req.body;
      if (!productId || !quantity || !userId) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }
      const cart: Cart = this.addProductToCartUseCase.addToCart(productId, quantity, userId);
      res.status(200).json({
        message: "Producto agregado al carrito",
        cart: {
          user: cart.getUser().getName(),
          products: cart.getItemCarts().map(item => ({
            id: item.getProduct().getId(),
            name: item.getProduct().getName(),
            price: item.getProduct().getPrice(),
            quantity: item.getQuantity()
          })),
          total: cart.getTotal()
        }
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  checkout(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ error: "Falta el campo userId" });
      }
      const purchase = this.checkoutUseCase.checkout(userId);
      res.status(200).json({ message: "Checkout realizado con éxito", purchase });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
