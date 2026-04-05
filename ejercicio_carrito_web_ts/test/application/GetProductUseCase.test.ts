import { Product } from "../../src/domain/Product";
import { GetProductUseCase } from "../../src/application/GetProductUseCase";
import InMemoryProductRepository from "../../src/infrastructure/InMemoryProductRepository";

describe("Tests para GetProductUseCase", () => {
  beforeEach(() => {
    InMemoryProductRepository.products = [];
  });
  it("Trear una lista de productos vacios cuando no se han creado productos", () => {
    const repo = new InMemoryProductRepository();
    const products = new GetProductUseCase(repo);

    expect(products.getAll()).toEqual([]);
  });
  it("Trear una lista de productos con productos creados", () => {
    const repo = new InMemoryProductRepository();
    const products = new GetProductUseCase(repo);
    repo.saveProduct(new Product(1, "Galletas de fresa", 100, 50));

    expect(products.getAll()).toEqual([
      {
        id: 1,
        name: "Galletas de fresa",
        price: 100,
        stock: 50,
      },
    ]);
  });
  it("Trear una lista de productos con varios productos creados", () => {
    const repo = new InMemoryProductRepository();
    repo.saveProduct(new Product(1, "Galletas de fresa", 100, 50));
    repo.saveProduct(new Product(2, "Galletas de avena", 120, 30));
    const products = new GetProductUseCase(repo);

    expect(products.getAll()).toEqual([
      new Product(1, "Galletas de fresa", 100, 50),
      new Product(2, "Galletas de avena", 120, 30),
    ]);
  });
});
