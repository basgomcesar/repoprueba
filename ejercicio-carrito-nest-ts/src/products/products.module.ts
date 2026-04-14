import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { InMemoryProducts } from './InMemoryProducts';

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
