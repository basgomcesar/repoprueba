import express, { Request, Response } from "express";
import { createProductoRoutes } from "./routes/product.route";
import InMemoryProductRepository from "../InMemoryProductRepository";
import { AddProductUseCase } from "../../../src/application/AddProductUseCase";
import { ProductController } from "./controller/product.controller";
const app = express();
const port = 3000;
app.use(express.json());


const productRepo = new InMemoryProductRepository();
const addProduct = new AddProductUseCase(productRepo);
const productController = new ProductController(addProduct);

app.use("/api/products", createProductoRoutes(productController));

const server = app
  .listen(port, () => {
    console.log("Server running at PORT: ", port);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

export { app, server };
