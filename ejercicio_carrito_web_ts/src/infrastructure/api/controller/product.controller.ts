import { Request, Response } from "express";
import { AddProductUseCase } from "../../../application/AddProductUseCase";
import { Product } from "../../../../src/domain/Product";

export class ProductController {
  constructor(
    private readonly agregarProductoUseCase: AddProductUseCase
  ) {}

  async add(req: Request, res: Response): Promise<void> {
    try {
      const { id,name,price,stock } = req.body;

      // Validación basica (cambiar)
      if (!name || !price) {
        res.status(400).json({ error: "nombre y precio son requeridos" });
        return;
      }

      await this.agregarProductoUseCase.createProduct(new Product(id,name,price,stock))
      res.status(201).json({
        message: "Producto creado correctamente",
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message || "Error interno del servidor",
      });
    }
  }
}
