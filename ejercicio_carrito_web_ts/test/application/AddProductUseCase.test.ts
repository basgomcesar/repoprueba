import { Product } from "../../src/domain/Product";
import DuplicateEntityException from "../../src/domain/exceptions/DuplicateEntityException";
import InMemoryProductRepository from "../../src/infrastructure/InMemoryProductRepository";
import { AddProductUseCase } from "../../src/application/AddProductUseCase";
import ProductRepository from "../../src/application/ProductRepository";

describe("Tests para AddProductUseCase", () => {
  it("Se llama al metodo saveProduct en el repository", () => {
    const product = new Product(2, "Galletas Marias", 25, 300);
    const mockRepository = {
      saveProduct: jest.fn().mockReturnValue(product),
      findProductById: jest.fn().mockReturnValue(false),
      getAllProducts: jest.fn().mockReturnValue([]),
      getProductById: jest.fn().mockReturnValue(undefined),
      updateProduct: jest.fn(),
      saveCart: jest.fn().mockReturnValue(undefined),
      getCartByUserId: jest.fn().mockReturnValue(undefined),
      getUserById: jest.fn().mockReturnValue(undefined),
      clearCart: jest.fn().mockReturnValue(false),
    };

    const addProduct = new AddProductUseCase(
      mockRepository as ProductRepository,
    );
    addProduct.createProduct(product);
    expect(mockRepository.saveProduct).toHaveBeenCalledTimes(1);
  });

  it("Error al crear un Producto con id duplicado", () => {
    const product = new Product(2, "Galletas Marias", 25, 200);
    const productGalletas = new Product(2, "Galletas Emperador", 25, 200);
    const repository = new InMemoryProductRepository();
    const addProduct = new AddProductUseCase(repository);
    addProduct.createProduct(product);
    expect(() => addProduct.createProduct(productGalletas)).toThrow(
      DuplicateEntityException,
    );
  });
});
