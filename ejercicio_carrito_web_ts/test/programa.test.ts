import { app, server } from "../app/programa";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

afterAll(() => {
  server.close();
});
describe("App carrito de compras", () => {
  describe("Alta de productos", () => {
    it("Debería agregar un producto al carrito (escenario exitoso)", async () => {
      const producto = {
        id: 2,
        nombre: "Leche",
        precio: 100,
        stock: 50
      };
      const response = await requestWithSupertest
        .post("/compras")
        .send(producto);
      expect(response.status).toBe(201);
    });
    it("Error por id duplicado", async () => {
      const producto = {
        id: 1,
        nombre: "Pan de molde",
        precio: 100,
        stock: 50
      };
      const response = await requestWithSupertest
        .post("/compras")
        .send(producto);
      expect(response.status).toBe(400);
    });

  });
  
});
