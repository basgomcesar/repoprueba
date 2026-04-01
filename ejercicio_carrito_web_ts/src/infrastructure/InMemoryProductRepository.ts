import ProductRepository from "src/application/ProductRepository";
import { Product } from "src/domain/Product";

export default class InMemoryProductRepository implements ProductRepository{
  findProductById(idProduct: number): boolean {
    return InMemoryProductRepository.products.find(p => p.getId() === idProduct) === undefined ? false :true;
  }
  static products: Product[] = [];
  saveProduct(product: Product): Product {
    InMemoryProductRepository.products.push(product);
    return product;
  }
  
}
