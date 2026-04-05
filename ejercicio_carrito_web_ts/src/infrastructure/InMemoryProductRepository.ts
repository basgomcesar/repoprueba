import ProductRepository from "src/application/ProductRepository";
import { Product } from "src/domain/Product";

export default class InMemoryProductRepository implements ProductRepository{
  getProductById(idProduct: number): Product {
    const product = InMemoryProductRepository.products.find(p => p.getId() === idProduct);
    if (!product) {
      throw new Error(`Producto con id ${idProduct} no encontrado`);
    }
    return product;
  }
  updateProduct(product: Product): void {
    const index = InMemoryProductRepository.products.findIndex(p => p.getId() === product.getId());
    if (index !== -1) {
      InMemoryProductRepository.products[index] = product;
    }
  }
  getAllProducts(): Product[] {
    const products = InMemoryProductRepository.products;
    return products;
  }
  findProductById(idProduct: number): boolean {
    return InMemoryProductRepository.products.find(p => p.getId() === idProduct) === undefined ? false :true;
  }
  static products: Product[] = [];
  saveProduct(product: Product): Product {
    InMemoryProductRepository.products.push(product);
    return product;
  }
}
