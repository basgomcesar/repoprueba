import InMemoryProductRepository from "../../../src/infrastructure/InMemoryProductRepository";
import { Product } from "../../../src/domain/Product";
import { app, server } from "../../../src/infrastructure/api/app";
import supertest from "supertest";
import { User } from "../../../src/domain/User";

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
      stock: 50,
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
      stock: -50,
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
      stock: 50,
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
      stock: 50,
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
      stock: 50,
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
      stock: 50,
    };
    const product2 = {
      id: 2,
      name: "Galletas de avena",
      price: 100,
      stock: 50,
    };
    await requestWithSupertest.post("/api/products").send(product);
    const response = await requestWithSupertest
      .post("/api/products")
      .send(product2);
    expect(response.status).toBe(400);
  });
});

describe("Pruebas para endpoint GET /api/products", () => {
  beforeEach(() => {
    InMemoryProductRepository.products.length = 0;
  });

  it("Deberia traer una lista de productos vacios cuando no hay productos creados", async () => {
    const response = await requestWithSupertest.get("/api/products");
    expect(response.body.length).toBe(0);
  });

  it("Deberia traer la lista de los productos creados", async () => {
    await requestWithSupertest.post("/api/products").send({
      id: 1,
      name: "Leche",
      price: 100,
      stock: 10,
    });

    await requestWithSupertest.post("/api/products").send({
      id: 2,
      name: "Pan",
      price: 50,
      stock: 20,
    });
    const response = await requestWithSupertest.get("/api/products");
    expect(response.body.length).toBe(2);
  });

  it("Deberia traer todos los productos sin perder ninguno", async () => {
    for (let i = 1; i <= 5; i++) {
      await requestWithSupertest.post("/api/products").send({
        id: i,
        name: `Producto ${i}`,
        price: 10 * i,
        stock: i,
      });
    }
    const response = await requestWithSupertest.get("/api/products");

    expect(response.body.length).toBe(5);
  });
});

describe("Pruebas para endpoint PUT /api/products", () => {
  beforeAll(() => {
    InMemoryProductRepository.products.push(new Product(2, "Leche", 100, 50));
  });

  it("Prueba actualizar un producto con exito", async () => {
    const product = {
      name: "Leche de almendras",
      price: 140,
      stock: 30,
    };
    const response = await requestWithSupertest
      .put("/api/products/2")
      .send(product);
    expect(response.status).toBe(200);
  });

  //prueba actualizar producto faild to pass
  it("Prueba actualizar un producto con stock negativo", async () => {
    const product = {
      name: "Leche de almendras",
      price: 140,
      stock: -30,
    };
    const response = await requestWithSupertest
      .put("/api/products/2")
      .send(product);
    expect(response.status).toBe(400);
  });

  it("Prueba actualizar un producto con precio negativo", async () => {
    const product = {
      name: "Leche de almendras",
      price: -140,
      stock: 30,
    };
    const response = await requestWithSupertest
      .put("/api/products/2")
      .send(product);
    expect(response.status).toBe(400);
  });

  it("Prueba actualizar un producto sin nombre", async () => {
    const product = {
      name: "",
      price: 140,
      stock: 30,
    };
    const response = await requestWithSupertest
      .put("/api/products/2")
      .send(product);
    expect(response.status).toBe(400);
  });
});

describe("Pruebas para endpoint /api/carts", () => {
  beforeEach(() => {
    InMemoryProductRepository.products.length = 0;
    InMemoryProductRepository.carts.length = 0;
  });

  it("Deberia agregar un producto al carrito con exito", async () => {
    //Crear usuario primero
    InMemoryProductRepository.users.push(
      new User(123, "Usuario 123", "usuario123@example.com"),
    );
    // Crear producto primero
    await requestWithSupertest.post("/api/products").send({
      id: 1,
      name: "Leche",
      price: 100,
      stock: 10,
    });

    const response = await requestWithSupertest.post("/api/carts").send({
      productId: 1,
      quantity: 2,
      userId: 123,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.cart.products.length).toBe(1);
  });

  it("Deberia regresar error si el producto no existe", async () => {
    const response = await requestWithSupertest.post("/api/carts").send({
      productId: 999,
      quantity: 2,
      userId: 123,
    });

    expect(response.status).toBe(400);
  });

  it("Deberia regresar error si la cantidad es negativa", async () => {
    await requestWithSupertest.post("/api/products").send({
      id: 1,
      name: "Leche",
      price: 100,
      stock: 10,
    });

    const response = await requestWithSupertest.post("/api/carts").send({
      productId: 1,
      quantity: -2,
      userId: 123,
    });

    expect(response.status).toBe(400);
  });

  it("Deberia regresar error si la cantidad excede el stock", async () => {
    await requestWithSupertest.post("/api/products").send({
      id: 1,
      name: "Leche",
      price: 100,
      stock: 2,
    });

    const response = await requestWithSupertest.post("/api/carts").send({
      productId: 1,
      quantity: 5,
      userId: 123,
    });

    expect(response.status).toBe(400);
  });

  it("Deberia acumular la cantidad si el producto ya esta en el carrito", async () => {
    await requestWithSupertest.post("/api/products").send({
      id: 1,
      name: "Leche",
      price: 100,
      stock: 10,
    });

    await requestWithSupertest.post("/api/carts").send({
      productId: 1,
      quantity: 2,
      userId: 123,
    });

    const response = await requestWithSupertest.post("/api/carts").send({
      productId: 1,
      quantity: 3,
      userId: 123,
    });

    expect(response.status).toBe(200);
    expect(response.body.cart.products[0].quantity).toBe(5);
  });

  it("NO deberia modificar el stock del producto", async () => {
    await requestWithSupertest.post("/api/products").send({
      id: 1,
      name: "Leche",
      price: 100,
      stock: 10,
    });

    await requestWithSupertest.post("/api/carts").send({
      productId: 1,
      quantity: 2,
      userId: 123,
    });

    const response = await requestWithSupertest.get("/api/products");

    expect(response.body[0].stock).toBe(10);
  });

  it("Deberia regresar error si faltan campos", async () => {
    const response = await requestWithSupertest.post("/api/carts").send({
      productId: 1,
    });

    expect(response.status).toBe(400);
  });
});

describe("Pruebas para endpoint POST /api/carts/checkout", () => {
  beforeEach(() => {
    InMemoryProductRepository.products.length = 0;
    InMemoryProductRepository.carts.length = 0;
    InMemoryProductRepository.users.length = 0;
  });

  it("Deberia hacer checkout con exito", async () => {
    InMemoryProductRepository.users.push(
      new User(123, "Usuario 123", "usuario123@example.com"),
    );
    await requestWithSupertest.post("/api/products").send({
      id: 1,
      name: "Leche",
      price: 100,
      stock: 10,
    });

    await requestWithSupertest.post("/api/carts").send({
      productId: 1,
      quantity: 3,
      userId: 123,
    });

    const response = await requestWithSupertest
      .post("/api/carts/checkout")
      .send({ userId: 123 });

    expect(response.status).toBe(200);
    expect(response.body.purchase.total).toBe(300);
    expect(response.body.purchase.items.length).toBe(1);
    expect(response.body.purchase.items[0].productId).toBe(1);
    expect(response.body.purchase.items[0].quantity).toBe(3);
  });

  it("Deberia lanzar error si el usuario no existe", async () => {
    const response = await requestWithSupertest.post("/api/carts/checkout").send({
      userId: 999,
    });

    expect(response.status).toBe(400);
  });

  it("Deberia lanzar error si el carrito está vacío", async () => {
    InMemoryProductRepository.users.push(
      new User(123, "Usuario 123", "usuario123@example.com"),
    );
    const response = await requestWithSupertest.post("/api/carts/checkout").send({
      userId: 123,
    });

    expect(response.status).toBe(400);
  });
});
