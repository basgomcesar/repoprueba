import { Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from '../application/orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    getAllOrders() {
        return this.ordersService.getAllOrders();
    }
}
