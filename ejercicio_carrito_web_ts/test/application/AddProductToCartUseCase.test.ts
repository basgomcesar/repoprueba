import ProductRepository from "../../src/application/ProductRepository";
import AddProductToCartUseCase from "../../src/application/AddProductToCartUseCase";
import { Product } from "../../src/domain/Product";
import { User } from "../../src/domain/User";

describe("Test para AddProductToCartUseCase", () => {
  it("Deberia agregar un producto al carrito con exito", () => {
    const mockRepository = {
      findProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 20)),
      getAllProducts: jest.fn().mockReturnValue([]),
      getProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 20)),
      saveProduct: jest.fn(),
      updateProduct: jest.fn(),
      getUserById: jest
        .fn()
        .mockReturnValue(new User(123, "Usuario 123", "user@gmail.com")),
      saveCart: jest.fn().mockReturnValue(undefined),
      getCartByUserId: jest.fn().mockReturnValue(undefined),
        clearCart: jest.fn().mockReturnValue(false),
    };

    const addToCartUseCase = new AddProductToCartUseCase(
      mockRepository as ProductRepository,
    );
    const cart = addToCartUseCase.addToCart(1, 2, 123);
    expect(cart).toBeDefined();
    expect(cart.getItemCarts()).toHaveLength(1);
  });

  it("Deberia lanzar error si el producto no existe", () => {
    const mockRepository = {
      findProductById: jest.fn().mockReturnValue(undefined),
      getUserById: jest
        .fn()
        .mockReturnValue(new User(123, "Usuario 123", "user@gmail.com")),
      getProductById: jest.fn().mockReturnValue(undefined),
    };

    const useCase = new AddProductToCartUseCase(
      mockRepository as unknown as ProductRepository,
    );

    expect(() => useCase.addToCart(1, 2, 123)).toThrow(
      "Producto no encontrado",
    );
  });

  it("Deberia lanzar error si el usuario no existe", () => {
    const mockRepository = {
      findProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 10)),
      getUserById: jest.fn().mockReturnValue(undefined),
      getProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 10)),
    };

    const useCase = new AddProductToCartUseCase(
      mockRepository as unknown as ProductRepository,
    );

    expect(() => useCase.addToCart(1, 2, 123)).toThrow("Usuario no encontrado");
  });

  it("Deberia lanzar error si la cantidad es negativa", () => {
    const mockRepository = {
      findProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 10)),
      getUserById: jest
        .fn()
        .mockReturnValue(new User(123, "Usuario 123", "user@gmail.com")),
      getProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 10)),
      getCartByUserId: jest.fn().mockReturnValue(undefined),
      saveCart: jest.fn(),
    };

    const useCase = new AddProductToCartUseCase(
      mockRepository as unknown as ProductRepository,
    );

    expect(() => useCase.addToCart(1, -1, 123)).toThrow("Cantidad inválida");
  });

  it("Deberia lanzar error si la cantidad excede el stock", () => {
    const mockRepository = {
      findProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 5)),
      getUserById: jest
        .fn()
        .mockReturnValue(new User(123, "Usuario 123", "user@gmail.com")),
      getProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 5)),
    };

    const useCase = new AddProductToCartUseCase(
      mockRepository as unknown as ProductRepository,
    );

    expect(() => useCase.addToCart(1, 10, 123)).toThrow("Stock insuficiente");
  });

  it("Deberia incrementar la cantidad si el producto ya existe en el carrito", () => {
    const product = new Product(1, "Producto 1", 10.0, 10);
    const mockCart = {
      getProducts: jest.fn().mockReturnValue([{ productId: 1, quantity: 2 }]),
      addProduct: jest.fn(),
      getItemCarts: jest.fn().mockReturnValue([
        {
          getProduct: () => product,
          getQuantity: () => 2,
          setQuantity: jest.fn(),
        },
      ]),
    };

    const mockRepository = {
      findProductById: jest.fn().mockReturnValue(product),
      getUserById: jest
        .fn()
        .mockReturnValue(new User(123, "Usuario 123", "user@gmail.com")),
      getProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 10)),
      getCartByUserId: jest.fn().mockReturnValue(mockCart),
      saveCart: jest.fn(),
    };

    const useCase = new AddProductToCartUseCase(
      mockRepository as unknown as ProductRepository,
    );

    const cart = useCase.addToCart(1, 3, 123);

    expect(mockRepository.saveCart).toHaveBeenCalledWith(cart);
  });

  it("Deberia crear un carrito si el usuario no tiene uno", () => {
    const mockRepository = {
      findProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 10)),
      getUserById: jest
        .fn()
        .mockReturnValue(new User(123, "Usuario 123", "user@gmail.com")),
      getProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 10)),
      getCartByUserId: jest.fn().mockReturnValue(undefined),
      saveCart: jest.fn(),
    };

    const useCase = new AddProductToCartUseCase(
      mockRepository as unknown as ProductRepository,
    );

    const cart = useCase.addToCart(1, 2, 123);

    expect(cart).toBeDefined();
  });

  it("Deberia lanzar error si el producto no tiene stock", () => {
    const mockRepository = {
      findProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 0)),
      getUserById: jest
        .fn()
        .mockReturnValue(new User(123, "Usuario 123", "user@gmail.com")),
      getProductById: jest
        .fn()
        .mockReturnValue(new Product(1, "Producto 1", 10.0, 0)),
    };

    const useCase = new AddProductToCartUseCase(
      mockRepository as unknown as ProductRepository,
    );

    expect(() => useCase.addToCart(1, 1, 123)).toThrow("Stock insuficiente");
  });

  it("NO deberia modificar el stock del producto al agregar al carrito", () => {
    const product = new Product(1, "Producto 1", 10.0, 10);

    const mockRepository = {
      findProductById: jest.fn().mockReturnValue(product),
      getUserById: jest
        .fn()
        .mockReturnValue(new User(123, "Usuario 123", "user@gmail.com")),
      updateProduct: jest.fn(),
      getProductById: jest.fn().mockReturnValue(product),
      getCartByUserId: jest.fn().mockReturnValue(undefined),
      saveCart: jest.fn(),
    };

    const useCase = new AddProductToCartUseCase(
      mockRepository as unknown as ProductRepository,
    );

    useCase.addToCart(1, 2, 123);

    expect(mockRepository.updateProduct).not.toHaveBeenCalled();
  });
});
