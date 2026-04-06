import { Request, Response } from "express";
import { AddProductUseCase } from "../../../application/AddProductUseCase";
import { GetProductUseCase } from "../../../application/GetProductUseCase";
import InvalidDataException from "../../../../src/domain/exceptions/InvalidDataException";
import { Product } from "../../../../src/domain/Product";
import DuplicateEntityException from "../../../../src/domain/exceptions/DuplicateEntityException";
import UpdateProductUseCase from "../../../../src/application/UpdateProductUseCase";

export class ProductController {
  constructor(
    private readonly addProductUseCase: AddProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase
  ) { }

  async add(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, price, stock } = req.body;

      
      if (!name || !price) {
        res.status(400).json({ error: "nombre y precio son requeridos" });
        return;
      }

      this.addProductUseCase.createProduct(new Product(id, name, price, stock));
      res.status(201).json({
        message: "Producto creado correctamente",
      });
    } catch (error: any) {
      if (error instanceof InvalidDataException) {
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
      return res.status(500).json({
        error: error.message || "Error interno del servidor",
      });

    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, price, stock } = req.body;

      if (!name && !price && !stock) {
        return res.status(400).json({ error: "Al menos un campo (nombre, precio o stock) es requerido para actualizar" });
      }

      const updatedProduct = this.updateProductUseCase.updateProduct(parseInt(id), name, price, stock);
      return res.status(200).json({
        message: "Producto actualizado correctamente",
        product: updatedProduct
      });
    } catch (error: any) {
      if (error.name === "InvalidDataException") {
        return res.status(400).json({
          message: error.message,
        });
      }
      if (error.name === "DuplicateEntityException") {
        return res.status(400).json({
          message: error.message,
        });
      }
      return res.status(500).json({
        error: error.message || "Error interno del servidor",
      });
    }
  }
}
