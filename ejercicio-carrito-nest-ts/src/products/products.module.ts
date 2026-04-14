import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/products.controller';
import { ProductsService } from './application/products.service';
import { InMemoryProducts } from './infrastructure/InMemoryProducts';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'ProductsRepository',
      useClass: InMemoryProducts,
    }
  ]
})
export class ProductsModule {}
