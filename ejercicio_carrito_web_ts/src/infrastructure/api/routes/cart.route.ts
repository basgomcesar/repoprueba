import { Router } from "express";
import { CartController } from "../controller/cart.controller";

export function createCartRoutes(controller: CartController) {
  const router = Router();

  router.post("/", controller.addToCart.bind(controller));
  router.post("/checkout", (req, res) => {res.send("Checkout not implemented yet")});

  return router;
}
