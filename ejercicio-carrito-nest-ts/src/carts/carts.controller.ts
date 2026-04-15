import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CartsService } from './application/carts.service';
import { AddProductToCartDto } from './infrastructure/dtos/AddProductToCartDto';

@Controller('carts')
export class CartsController {

    constructor(private readonly cartsService: CartsService) { }

    @Post('add/:phoneNumber')
    addProductToCart(@Param('phoneNumber') phoneNumber: string, @Body() body: AddProductToCartDto) {
        return this.cartsService.addProductToCart(phoneNumber, body.sku, body.quantity);
    }

    @Get(':phoneNumber')
    getCartByUser(@Param('phoneNumber') phoneNumber: string) {
        return this.cartsService.getCartByUser(phoneNumber);
    }

}
