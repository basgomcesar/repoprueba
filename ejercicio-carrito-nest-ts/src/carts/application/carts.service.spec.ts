import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-12345')
}));


describe('CartsService', () => {
  let service: CartsService;
  const mockCartsRepository = {
    addProductToCart: jest.fn(),
    saveCart: jest.fn(),
    getCartByUser: jest.fn(),
  };
  const mockUsersRepository = {
    getUserByPhone: jest.fn(),
  };
  const mockProductsRepository = {
    getProductBySKU: jest.fn(),
  };
  const mockOrdersRepository = {
    saveOrder: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        {
          provide: 'CartsRepository',
          useValue: mockCartsRepository,
        },
        {
          provide: 'UsersRepository',
          useValue: mockUsersRepository,
        },
        {
          provide: 'ProductRepository',
          useValue: mockProductsRepository,
        },
        {
          provide: 'OrdersRepository',
          useValue: mockOrdersRepository,
        }

      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add product to cart', () => {
    const phoneNumber = '1234567890';
    const sku = 'product-1';
    const quantity = 2;
    const mockUser = { id: 'user-1', phoneNumber };
    const mockProduct = { sku, getStock: jest.fn().mockReturnValue(10), getPrice: jest.fn().mockReturnValue(5) };
    const mockCart = { id: 'cart-1', userId: mockUser.id, items: [], getItemCarts: jest.fn().mockReturnValue([]), saveItemCart: jest.fn(), addProduct: jest.fn(), setTotal: jest.fn() };
    mockProductsRepository.getProductBySKU.mockReturnValue(mockProduct);
    mockUsersRepository.getUserByPhone.mockReturnValue(mockUser);
    mockCartsRepository.addProductToCart.mockReturnValue(mockCart);
    service.addProductToCart(phoneNumber, sku, quantity);
    expect(mockUsersRepository.getUserByPhone).toHaveBeenCalledWith(phoneNumber);
    expect(mockCartsRepository.addProductToCart).toHaveBeenCalledWith(mockUser, sku, quantity);
  });

  it('should return the result of adding product to cart', () => {
    const phoneNumber = '1234567890';
    const sku = 'product-1';
    const quantity = 2;
    const mockUser = { id: 'user-1', phoneNumber };
    const mockCart = { id: 'cart-1', userId: mockUser.id, items: [], getItemCarts: jest.fn().mockReturnValue([]), saveItemCart: jest.fn(), addProduct: jest.fn(), setTotal: jest.fn() };
    const mockProduct = { sku, getStock: jest.fn().mockReturnValue(10), getPrice: jest.fn().mockReturnValue(5) };
    mockProductsRepository.getProductBySKU.mockReturnValue(mockProduct);
    mockUsersRepository.getUserByPhone.mockReturnValue(mockUser);
    mockCartsRepository.addProductToCart.mockReturnValue(mockCart);
    const result = service.addProductToCart(phoneNumber, sku, quantity);
    expect(result).toBe(mockCart);
  });

  it('should throw error if user not found', () => {
    const phoneNumber = '1234567890';
    const sku = 'product-1';
    const quantity = 2;
    mockProductsRepository.getProductBySKU.mockReturnValue({ sku, getStock: jest.fn().mockReturnValue(10), getPrice: jest.fn().mockReturnValue(5) });
    mockUsersRepository.getUserByPhone.mockReturnValue(null);
    expect(() => service.addProductToCart(phoneNumber, sku , quantity)).toThrow('Usuario no encontrado');
    expect(mockUsersRepository.getUserByPhone).toHaveBeenCalledWith(phoneNumber);
    mockCartsRepository.addProductToCart.mockReturnValue(null);
  });

});
