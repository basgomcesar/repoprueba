import { Product } from "src/domain/Product";
import ProductRepository from "./ProductRepository";

export class GetProductUseCase{
  getAll(): Product[]{
    return this.repository.getAllProducts();
  }
  constructor( private readonly repository: ProductRepository ){
  }
  
}
