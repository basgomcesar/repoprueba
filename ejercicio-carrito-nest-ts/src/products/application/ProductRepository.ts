import { Product } from "../domain/Product";

export default interface ProductRepository {
  getAllProducts(): Product[];
  findProductBySKU(sku: string): boolean;
  getProductById(idProduct: number): Product;
  updateProduct(product: Product): void;
  saveProduct(product: Product): Product;
}
