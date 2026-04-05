import express, { Request, Response } from "express";
import { createProductRoutes } from "./routes/product.route";
import InMemoryProductRepository from "../InMemoryProductRepository";
import { AddProductUseCase } from "../../../src/application/AddProductUseCase";
import { ProductController } from "./controller/product.controller";
import { GetProductUseCase } from "../../../src/application/GetProductUseCase";
import UpdateProductUseCase from "../../../src/application/UpdateProductUseCase";
import { createCartRoutes } from "./routes/cart.route";
import { CartController } from "./controller/cart.controller";
import AddProductToCartUseCase from "../../../src/application/AddProductToCartUseCase";
import { CheckoutUseCase } from "../../../src/application/CheckoutUseCase";
const app = express();
const port = 3000;
app.use(express.json());


const productRepo = new InMemoryProductRepository();
const addProduct = new AddProductUseCase(productRepo);
const getProduct = new GetProductUseCase(productRepo);
const updateProduct = new UpdateProductUseCase(productRepo);
const productController = new ProductController(addProduct,getProduct,updateProduct);

const addProductToCartUseCase = new AddProductToCartUseCase(productRepo);
const checkoutUseCase = new CheckoutUseCase(productRepo);
const cartController = new CartController(addProductToCartUseCase, checkoutUseCase);

app.use("/api/products", createProductRoutes(productController));
app.use("/api/carts", createCartRoutes(cartController));

const server = app
  .listen(port, () => {
    console.log("Server running at PORT: ", port);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

export { app, server };
