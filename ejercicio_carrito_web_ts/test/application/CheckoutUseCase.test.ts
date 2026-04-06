import { CheckoutUseCase } from "../../src/application/CheckoutUseCase";
import { User } from "../../src/domain/User";
import { Product } from "../../src/domain/Product";
import { CartItem } from "../../src/domain/CartItem";

describe("Tests para CheckoutUseCase", () => {

  const user = new User(123, "Usuario 123", "usuario123@example.com");

  const createMockCart = (products: CartItem[]) => {
    return {
      getItemCarts: jest.fn().mockReturnValue(products),
      getTotal: jest.fn().mockReturnValue(
        products.reduce((acc, item) => acc + item.getQuantity() * item.getProduct().getPrice(), 0)
      )
    };
  };

  const createItem = (product: Product, quantity: number) =>
    new CartItem(product, quantity);

  const baseMockRepository = {
    getUserById: jest.fn(),
    getCartByUserId: jest.fn(),
    updateProduct: jest.fn(),
    clearCart: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deberia realizar el checkout correctamente", () => {
    const product = new Product(1, "Producto 1", 10, 10);

    const cart = createMockCart([
      createItem(product, 2)
    ]);

    const mockRepository = {
      ...baseMockRepository,
      getUserById: jest.fn().mockReturnValue(user),
      getCartByUserId: jest.fn().mockReturnValue(cart)
    };

    const useCase = new CheckoutUseCase(mockRepository as any);

    const result = useCase.checkout(123);

    expect(result).toBeDefined();
    expect(result.getTotal()).toBe(20);
    expect(mockRepository.clearCart).toHaveBeenCalledWith(123);
    expect(mockRepository.updateProduct).toHaveBeenCalled();
  });

  it("Deberia lanzar error si el usuario no existe", () => {
    const mockRepository = {
      ...baseMockRepository,
      getUserById: jest.fn().mockReturnValue(undefined),
    };

    const useCase = new CheckoutUseCase(mockRepository as any);

    expect(() => useCase.checkout(123)).toThrow("Usuario no encontrado");
  });

  it("Deberia lanzar error si el carrito no existe", () => {
    const mockRepository = {
      ...baseMockRepository,
      getUserById: jest.fn().mockReturnValue(user),
      getCartByUserId: jest.fn().mockReturnValue(undefined),
    };

    const useCase = new CheckoutUseCase(mockRepository as any);

    expect(() => useCase.checkout(123)).toThrow("Cannot read"); 
  
  });

  it("Deberia lanzar error si el carrito está vacío", () => {
    const cart = createMockCart([]);

    const mockRepository = {
      ...baseMockRepository,
      getUserById: jest.fn().mockReturnValue(user),
      getCartByUserId: jest.fn().mockReturnValue(cart),
    };

    const useCase = new CheckoutUseCase(mockRepository as any);

    expect(() => useCase.checkout(123)).toThrow("El carrito está vacío");
  });

  it("Deberia lanzar error si no hay stock suficiente", () => {
    const product = new Product(1, "Producto 1", 10, 1);

    const cart = createMockCart([
      createItem(product, 5)
    ]);

    const mockRepository = {
      ...baseMockRepository,
      getUserById: jest.fn().mockReturnValue(user),
      getCartByUserId: jest.fn().mockReturnValue(cart),
    };

    const useCase = new CheckoutUseCase(mockRepository as any);

    expect(() => useCase.checkout(123)).toThrow("Stock insuficiente");
  });

  it("Deberia reducir el stock de los productos", () => {
    const product = new Product(1, "Producto 1", 10, 10);

    const spy = jest.spyOn(product, "setStock");

    const cart = createMockCart([
      createItem(product, 3)
    ]);

    const mockRepository = {
      ...baseMockRepository,
      getUserById: jest.fn().mockReturnValue(user),
      getCartByUserId: jest.fn().mockReturnValue(cart),
    };

    const useCase = new CheckoutUseCase(mockRepository as any);

    useCase.checkout(123);

    expect(spy).toHaveBeenCalledWith(7);
  });

  it("Deberia retornar un resumen de la compra", () => {
    const product = new Product(1, "Producto 1", 10, 10);

    const cart = createMockCart([
      createItem(product, 2)
    ]);

    const mockRepository = {
      ...baseMockRepository,
      getUserById: jest.fn().mockReturnValue(user),
      getCartByUserId: jest.fn().mockReturnValue(cart),
    };

    const useCase = new CheckoutUseCase(mockRepository as any);

    const result = useCase.checkout(123);

    expect(result.getTotal()).toBe(20);
    expect(result.getItems().length).toBe(1);
    expect(result.getItems()[0].getQuantity()).toBe(2);
  });

});
