import { Product } from "src/domain/Product";

export default interface ProductRepository {
  findProductById(idProduct: number): boolean;
  saveProduct(product: Product): Product;
}
