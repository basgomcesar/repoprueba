import InvalidDataException from "../../src/domain/exceptions/InvalidDataException";
import { Product } from "../../src/domain/Product";

describe("Test para producto", () => {
  it("Deberia crear un producto", () => {
    const product = new Product(1, "Producto 1", 10.0, 20);
    expect(product.getId()).toBe(1);
    expect(product.getName()).toBe("Producto 1");
    expect(product.getPrice()).toBe(10.0);
    expect(product.getStock()).toBe(20);
  });

  it("Deberia actualizar el stock del producto", () => {
    const product = new Product(1, "Producto 1", 10.0, 20);
    product.setStock(15);
    expect(product.getStock()).toBe(15);
  });

  it("Deberia actualizar el precio del producto", () => {
    const product = new Product(1, "Producto 1", 10.0, 20);
    product.setPrice(12.0);
    expect(product.getPrice()).toBe(12.0);
  });

  it("Deberia dar error al actualizar precio negativo", () => {
    const product = new Product(1, "Producto 1", 10.0, 20);

    expect(() => product.setPrice(-10)).toThrow(InvalidDataException);
  });

  it("Deberia dar error al crear un producto con stock negativo", () => {
    expect(() => new Product(1, "Producto 1", 10.0, -20)).toThrow(
      InvalidDataException,
    );
  });

  it("Deberia dar error al actualizar stock a negativo", () => {
    const product = new Product(1, "Producto 1", 10.0, 20);
    expect(() => product.setStock(-5)).toThrow(InvalidDataException);
  });
});
