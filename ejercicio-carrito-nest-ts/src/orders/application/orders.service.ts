import { Inject, Injectable } from '@nestjs/common';
import type OrdersRepository from './OrdersRepository';
import type CartsRepository from '../../carts/application/CartsRepository';
import type ProductsRepository from '../../products/application/ProductRepository';
import type UsersRepository from '../../users/application/UserRepository';

@Injectable()
export class OrdersService {
    constructor(@Inject('OrdersRepository') private orderRepository: OrdersRepository,
        @Inject('ProductsRepository') private productRepository: ProductsRepository,
        @Inject('UsersRepository') private userRepository: UsersRepository,
        @Inject('CartsRepository') private cartsRepository: CartsRepository) {
    }

    getAllOrders() {
        return this.orderRepository.getAllOrders();
    }
}
