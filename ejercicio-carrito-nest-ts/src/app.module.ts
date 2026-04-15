import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/infrastructure/users.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [ProductsModule, UsersModule, CartsModule],
})
export class AppModule {}
