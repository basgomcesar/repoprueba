import { Product } from "../../../src/domain/Product";
import { app, server } from "../../../src/infrastructure/api/app";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

afterAll(() => {
  server.close();
});

describe("Pruebas para endpoint POST /api/products", () => {
  it("Prueba para crear un producto con exito", async () => {
    const product = {
      id: 2,
      name: "Leche",
      price: 100,
      stock: 50
    };
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product);
    expect(response.status).toBe(201);
  });
  it("Deberia regresar un error al crear un producto con stock negativo", async () => {
    const product = {
      id: 2,
      name: "Leche",
      price: 100,
      stock: -50
    };
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product);
    expect(response.status).toBe(400);
  });
  it("Deberia regresar un error al crear un producto con precio negativo", async () => {
    const product = {
      id: 2,
      name: "Leche",
      price: -100,
      stock: 50
    };
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product);
    expect(response.status).toBe(400);
  });
  it("Deberia regresar un error al crear un producto sin nombre", async () => {
    const product = {
      id: 2,
      name: "",
      price: -100,
      stock: 50
    };
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product);
    expect(response.status).toBe(400);
  });
  it("Deberia regresar un error al crear un producto con campos faltantes", async () => {
    const product = {
      id: 2,
      price: -100,
      stock: 50
    };
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product);
    expect(response.status).toBe(400);
  });
});

describe("Pruebas para endpoint /api/cart", () => {
  it("Prueba para crear un producto con exito", async () => {
    const product = {
      id: 2,
      name: "Leche",
      price: 100,
      stock: 50
    };
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product);
    expect(response.status).toBe(201);
  });
  it("Deberia regresar un error al crear un producto con stock negativo", async () => {
    const product = {
      id: 2,
      name: "Leche",
      price: 100,
      stock: 50
    };
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product);
    expect(response.status).toBe(400);
  });
});

