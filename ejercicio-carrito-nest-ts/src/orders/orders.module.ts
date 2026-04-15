import { Module } from '@nestjs/common';
import { OrdersController } from './infrastructure/orders.controller';
import { OrdersService } from './application/orders.service';
import InMemoryOrders from './infrastructure/InMemoryOrders';
import InMemoryCarts from '../carts/infrastructure/InMemoryCarts';
import {InMemoryProducts} from '../products/infrastructure/InMemoryProducts';
import InMemoryUsers from '../users/infrastructure/InMemoryUsers';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, 
    {
        provide: 'OrdersRepository',
        useClass: InMemoryOrders,
    },{
        provide: 'ProductsRepository',
        useClass: InMemoryProducts,
    },{
        provide: 'UsersRepository',
        useClass: InMemoryUsers,
    },
    {
        provide: 'CartsRepository',
        useClass: InMemoryCarts,
    }
    ],
})
export class OrdersModule {}
 