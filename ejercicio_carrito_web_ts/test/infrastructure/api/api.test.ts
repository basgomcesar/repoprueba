import { Product } from "../../../src/domain/Product";
import { app, server } from "../../../src/infrastructure/api/app";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

afterAll(() => {
  server.close();
});

describe("Pruebas para app", () => {
  it("Prueba para crear un producto con exito", async () => {
    const product = new Product(2, "Leche", 100, 50);
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product);
    expect(response.status).toBe(201);
  });
});
