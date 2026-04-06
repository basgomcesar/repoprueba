import { Product } from "src/domain/Product";
import ProductRepository from "./ProductRepository";

export class GetProductUseCase {

  private readonly repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  getAll(): Product[] {
    return this.repository.getAllProducts();
  }

}
