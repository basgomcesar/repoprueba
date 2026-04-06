import { Router } from "express";
import { CartService } from "../controller/cart.service";

export function createCartRoutes(service: CartService): Router {
  const router = Router();

  router.post("/", service.addToCart.bind(service));
  router.post("/checkout", service.checkout.bind(service));

  return router;
}
