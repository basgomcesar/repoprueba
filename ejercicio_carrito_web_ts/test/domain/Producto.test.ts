import { Producto } from "../../app/producto";

describe("Test para producto", () => {
    it("Deberia crear un producto", () => {
        const producto = new Producto(1, "Producto 1", 10.0, 20);
        expect(producto.getId()).toBe(1);
        expect(producto.getNombre()).toBe("Producto 1");
        expect(producto.getPrecio()).toBe(10.0);
        expect(producto.getStock()).toBe(20);
    });
});
