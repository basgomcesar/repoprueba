import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from '../application/products.service';
import { CreateProductDto } from './dtos/CreateProductDto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productsService.getAllProducts();
    }
}
