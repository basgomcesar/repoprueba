import { Request, Response } from "express";
import { AddProductUseCase } from "../../../application/AddProductUseCase";
import { GetProductUseCase } from "../../../application/GetProductUseCase";
import InvalidDataException from "../../../../src/domain/exceptions/InvalidDataException";
import { Product } from "../../../../src/domain/Product";
import DuplicateEntityException from "../../../../src/domain/exceptions/DuplicateEntityException";

export class ProductController {
  constructor(
    private readonly addProductUseCase: AddProductUseCase,
    private readonly getProductUseCase: GetProductUseCase
  ) { }

  async add(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, price, stock } = req.body;

      // Validación basica (cambiar)
      if (!name || !price) {
        res.status(400).json({ error: "nombre y precio son requeridos" });
        return;
      }

      this.addProductUseCase.createProduct(new Product(id, name, price, stock));
      res.status(201).json({
        message: "Producto creado correctamente",
      });
    } catch (error: any) {
      if (error.name === "InvalidDataException") {
        return res.status(400).json({
          message: error.message,
        });
      }
      if (error instanceof DuplicateEntityException) {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        error: error.message || "Error interno del servidor",
      });
    }
  }
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = this.getProductUseCase.getAll();
      return res.status(200).json(products);
    } catch (error: any) {

    }
  }
}
