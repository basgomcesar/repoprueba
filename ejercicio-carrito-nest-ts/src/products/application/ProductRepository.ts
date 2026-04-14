import { Product } from "../domain/entities/Product";

export default interface ProductRepository {
  getAllProducts(): Product[];
  findProductBySKU(sku: string): boolean;
  getProductBySKU(sku: string): Product | null;
  updateProduct(product: Product): void;
  saveProduct(product: Product): Product;
}
