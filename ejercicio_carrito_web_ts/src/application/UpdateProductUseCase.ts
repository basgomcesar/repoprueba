import ProductRepository from "./ProductRepository";

export default class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}
  updateProduct(id: number,name: string, price: number, stock: number): void {
    const isExistingProduct = this.productRepository.findProductById(id);
    if (!isExistingProduct) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
    if (price < 0) {
      throw new Error("Precio no puede ser negativo");
    }
    if (stock < 0) {
      throw new Error("Stock no puede ser negativo");
    }
    const existingProduct = this.productRepository.getProductById(id);
    existingProduct.setPrice(price);
    existingProduct.setStock(stock);
    existingProduct.setName(name);
    this.productRepository.updateProduct(existingProduct);
  }
}
