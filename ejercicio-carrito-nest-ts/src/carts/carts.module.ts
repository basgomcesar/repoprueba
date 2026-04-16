import { Module } from '@nestjs/common';
import { CartsService } from './application/carts.service';
import { CartsController } from './carts.controller';
import  InMemoryCarts  from './infrastructure/InMemoryCarts';
import InMemoryUsers from '../users/infrastructure/InMemoryUsers';
import { InMemoryProducts } from '../products/infrastructure/InMemoryProducts';
import InMemoryOrders from '../orders/infrastructure/InMemoryOrders';

@Module({
  controllers: [CartsController],
  providers: [CartsService,
  {
    provide: 'CartsRepository',
    useClass: InMemoryCarts,
  },
  {
    provide: 'UsersRepository',
    useClass: InMemoryUsers,
  },
  {
    provide: 'ProductRepository',
    useClass: InMemoryProducts,
  },
  {
    provide: 'OrdersRepository',
    useClass: InMemoryOrders,
  }
  ]
})
export class CartsModule { }
