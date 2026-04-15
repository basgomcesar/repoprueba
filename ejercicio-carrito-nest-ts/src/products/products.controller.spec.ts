import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './infrastructure/products.controller';
import { ProductsService } from './application/products.service';
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-12345')
}));

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
