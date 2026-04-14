import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import type ProductRepository from './ProductRepository';
import { Product } from '../domain/entities/Product';

describe('ProductsService', () => {
  let service: ProductsService;
  const mockProductsRepository = {
    saveProduct: jest.fn().mockImplementation((product) => {
      return { ...product, id: 1 };
    }),
    findProductBySKU: jest.fn().mockReturnValue(false),
    getAllProducts: jest.fn().mockReturnValue([]),
    getProductBySKU: jest.fn().mockReturnValue(new Product(1, 'Arroz', 50, 'ARZ-001', 10)),
    updateProduct: jest.fn(),
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

  it('should return all products', () => {
    const products = service.getAllProducts();
    expect(products).toEqual([]);
  });

  it("should return all products", () => {
    mockProductsRepository.getAllProducts.mockReturnValue([new Product(1, 'Arroz', 50, 'ARZ-001', 10), new Product(2, 'Frijoles', 30, 'FRJ-001', 20)]);
    const products = service.getAllProducts();
    expect(products).toEqual([new Product(1, 'Arroz', 50, 'ARZ-001', 10), new Product(2, 'Frijoles', 30, 'FRJ-001', 20)]);
  });

  it("should return a product updated", () => {
    mockProductsRepository.getProductBySKU.mockReturnValue(new Product(1, 'Arroz', 50, 'ARZ-001', 10));
    const product = service.updateProductStock('ARZ-001', 35);
    expect(product).toEqual(expect.objectContaining({
      sku: 'ARZ-001',
      stock: 35,
    }));
  });

  it("should throw an error when updating stock for unknown sku", () => {
    mockProductsRepository.getProductBySKU.mockReturnValue(null);
    expect(() => service.updateProductStock('UNKNOWN-001', 15)).toThrow();
  });

  it("should throw an error when updating stock with invalid value", () => {
    mockProductsRepository.findProductBySKU.mockReturnValue(true);
    expect(() => service.updateProductStock('ARZ-001', -5)).toThrow();
  });
});
