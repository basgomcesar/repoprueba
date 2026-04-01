import { Router } from "express";
import { ProductController } from "../controller/product.controller";

export function createProductoRoutes(controller: ProductController) {
  const router = Router();

  router.post("/", controller.add.bind(controller));

  return router;
}
