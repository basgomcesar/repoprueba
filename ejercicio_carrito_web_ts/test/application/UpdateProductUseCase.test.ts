import { Product } from "../../src/domain/Product";
import InMemoryProductRepository from "../../src/infrastructure/InMemoryProductRepository";
import UpdateProductUseCase from "../../src/application/UpdateProductUseCase";

describe("Test para UpdateProductUseCase", () => {
  beforeEach(() => {
    InMemoryProductRepository.products = [new Product(1, "Producto 1", 10.0, 20), new Product(2, "Producto 2", 15.0, 30)];
  });
  it("Deberia actualizar el precio y stock de un producto", () => {
    const repo = new InMemoryProductRepository();
    const product = new Product(1, "Producto 1", 10.0, 20);
    const updatedProductUseCase = new UpdateProductUseCase(repo);
    updatedProductUseCase.updateProduct(1, 20.0, 40);
    const updatedProduct = repo.getProductById(1);
    expect(updatedProduct.getPrice()).toBe(20.0);
    expect(updatedProduct.getStock()).toBe(40);
  });
  it("Deberia lanzar un error si el producto no existe", () => {
    const repo = new InMemoryProductRepository();
    const updatedProductUseCase = new UpdateProductUseCase(repo);
    expect(() => updatedProductUseCase.updateProduct(999, 20.0, 40)).toThrowError("Producto con id 999 no encontrado");
  });
  it("Deberia actualizar el precio y stock de un producto existente", () => {
    const repo = new InMemoryProductRepository();
    const updatedProductUseCase = new UpdateProductUseCase(repo);
    updatedProductUseCase.updateProduct(1, 20.0, 40);
    const updatedProduct = repo.getProductById(1);
    expect(updatedProduct.getPrice()).toBe(20.0);
    expect(updatedProduct.getStock()).toBe(40);
  });
  it("Deberia lanzar un error si se intenta actualizar el precio a un valor negativo", () => {
    const repo = new InMemoryProductRepository();
    const updatedProductUseCase = new UpdateProductUseCase(repo);
    expect(() => updatedProductUseCase.updateProduct(1, -10.0, 40)).toThrowError("Precio no puede ser negativo");
  });
  it("Deberia lanzar un error si se intenta actualizar el stock a un valor negativo", () => {
    const repo = new InMemoryProductRepository();
    const updatedProductUseCase = new UpdateProductUseCase(repo);
    expect(() => updatedProductUseCase.updateProduct(1, 20.0, -5)).toThrowError("Stock no puede ser negativo");
  });
});
