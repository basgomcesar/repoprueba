import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../application/orders.service';
import OrdersRepository from './OrdersRepository';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepositoryMock = {
    getOrderById: jest.fn(),
    saveOrder: jest.fn(),
    updateOrder: jest.fn(),
  };

  let productRepositoryMock = {
    getProductById: jest.fn(),
    updateProduct: jest.fn(),
  };

  let userRepositoryMock = {
    getUserByPhone: jest.fn(),
  };

  let cartsRepositoryMock = {
    getCartByUser: jest.fn(),
    clearCart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: 'OrdersRepository',
          useValue: orderRepositoryMock,
        },
        {
          provide: 'ProductsRepository',
          useValue: productRepositoryMock,
        },
        {
          provide: 'UsersRepository',
          useValue: userRepositoryMock,
        },
        {
          provide: 'CartsRepository',
          useValue: cartsRepositoryMock,
        }
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
