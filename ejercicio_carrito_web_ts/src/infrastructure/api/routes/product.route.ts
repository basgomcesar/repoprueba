import { Router } from "express";
import { ProductController } from "../controller/product.controller";

export function createProductRoutes(controller: ProductController) {
  const router = Router();

  router.post("/", controller.add.bind(controller));
  router.get("/", controller.getAll.bind(controller));
  router.put("/:id", controller.update.bind(controller));

  return router;
}
