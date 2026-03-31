import { Product } from "src/domain/Product";

export default interface ProductRepository {
  AddProduct(product: Product): Product;
}
