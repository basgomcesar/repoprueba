import { Product } from "../../../src/domain/Product";
import { app, server } from "../../../src/infrastructure/api/app";
import supertest from "supertest";

const requestWithSupertest = supertest(app);

afterAll(() => {
  server.close();
});

describe("Pruebas para endpoint POST /api/products", () => {
  it("Deberia crear un producto con exito", async () => {
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
  it("Deberia regresar un error al tratar de crear un producto con IDs duplicados", async () => {
    const product = {
      id: 2,
      name: "Galletas de fresa",
      price: 100,
      stock: 50
    };
    const product2 = {
      id: 2,
      name: "Galletas de avena",
      price: 100,
      stock: 50
    };
    await requestWithSupertest
      .post("/api/products")
      .send(product);
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product2);
    expect(response.status).toBe(400);
  });

});

describe("Pruebas para endpoint GET /api/products", () => {
  it("Deberia traer la lista de los productos creados", async () => {
    await requestWithSupertest
      .post("/api/products")
      .send({
        id: 1,
        name: "Leche",
        price: 100,
        stock: 10
      });

    await requestWithSupertest
      .post("/api/products")
      .send({
        id: 2,
        name: "Pan",
        price: 50,
        stock: 20
      });
    const response = await requestWithSupertest.get("/api/products");
    expect(response.body.length).toBe(2);
  });
  it("Deberia traer una lista de productos vacios cuando no hay productos creados", async () => {
    ;
    const response = await requestWithSupertest.get("/api/products");
    expect(response.body.length).toBe(0)
  });
  it("Deberia traer todos los productos sin perder ninguno", async () => {
    for (let i = 1; i <= 5; i++) {
      await requestWithSupertest.post("/api/products").send({
        id: i,
        name: `Producto ${i}`,
        price: 10 * i,
        stock: i
      });
    }
    const response = await requestWithSupertest.get("/api/products");

    expect(response.body.length).toBe(5);
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

