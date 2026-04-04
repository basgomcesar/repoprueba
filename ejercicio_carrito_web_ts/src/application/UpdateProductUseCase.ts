import ProductRepository from "./ProductRepository";

export default class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  updateProduct(id: number, price: number, stock: number): void {
    const product = this.productRepository.getProductById(id);
    if (!product) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
    product.updatePrice(price);
    product.updateStock(stock);
    this.productRepository.saveProduct(product);
  }
}
