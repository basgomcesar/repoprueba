import { Router } from "express";
import { ProductService } from "../controller/product.service";

export function createProductRoutes(service: ProductService): Router {
  const router = Router();

  router.post("/", service.add.bind(service));
  router.get("/", service.getAll.bind(service));
  router.put("/:id", service.update.bind(service));

  return router;
}
