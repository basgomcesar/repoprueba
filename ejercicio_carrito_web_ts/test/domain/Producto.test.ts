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
});
