import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import type ProductRepository from './ProductRepository';

describe('ProductsService', () => {
  let service: ProductsService;
  const mockProductsRepository = {
    saveProduct: jest.fn().mockImplementation((product) => {
      return { ...product, id: 1 };
    }),
    findProductBySKU: jest.fn().mockReturnValue(false),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'ProductsRepository',
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return product afeter creating it', () => {
    const product = service.create({
      name: 'Arroz',
      sku: 'ARZ-001',
      stock: 10,
      price: 50,
    });
    expect(product).toEqual(expect.objectContaining({
      name: expect.any(String),
      sku: expect.any(String),
      stock: expect.any(Number),
      price: expect.any(Number),
    }));
  });

  it('should return an error if missing fields', () => {
    try {
      service.create({
        name: 'Arroz',
        sku: 'ARZ-001',
        stock: 10,
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return an error if fields have wrong type', () => {
    try {
      service.create({
        name: 'Arroz',
        sku: 'ARZ-001',
        stock: '10' as any,
        price: 50,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return an error if the sku is not unique', () => {
    service.create({
      name: 'Frijoles',
      sku: 'FRJ-001',
      stock: 10,
      price: 50,
    });
    mockProductsRepository.findProductBySKU.mockReturnValue(true);
    expect(() => service.create({
      name: 'Frijoles negros',
      sku: 'FRJ-001',
      stock: 10,
      price: 50,
    })).toThrow();
  });

});
