import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
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

    @Put('/update-stock/:sku')
    updateStock(@Body('stock') stock: number, @Query('sku') sku: string) {
        return this.productsService.updateProductStock(sku, stock);
    }
}
