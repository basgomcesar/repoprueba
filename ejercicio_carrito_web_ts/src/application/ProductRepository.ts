import { Product } from "src/domain/Product";

export default interface ProductRepository {
  getAllProducts(): Product[];
  findProductById(idProduct: number): boolean;
  getProductById(idProduct: number): Product;
  updateProduct(product: Product): void;
  saveProduct(product: Product): Product;
}
