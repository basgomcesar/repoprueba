import DuplicateEntityException from "../../src/domain/exceptions/DuplicateEntityException";
import { Product } from "../domain/Product"
import ProductRepository from "./ProductRepository"

export class AddProductUseCase {

  private readonly repository: ProductRepository;

  createProduct(product: Product): Product {
    const existingProduct: boolean = this.repository.findProductById(product.getId());
    if (existingProduct) {
      throw new DuplicateEntityException("El producto con este id ya existe");
    }
    return this.repository.saveProduct(product);
  }
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

}
