import { Product } from "src/domain/Product";

export default interface ProductRepository {
  getAllProducts(): Product[];
  findProductById(idProduct: number): boolean;
  saveProduct(product: Product): Product;
}
