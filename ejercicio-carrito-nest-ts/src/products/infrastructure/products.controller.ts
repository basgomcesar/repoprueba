import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from '../application/products.service';
import { CreateProductDto } from './dtos/CreateProductDto';
import { UpdateProductStockDto } from './dtos/UpdateProductDto';

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
    updateStock(@Param('sku') sku: string, @Body() updateStock :UpdateProductStockDto) {
        return this.productsService.updateProductStock(sku, updateStock.stock);
    }
}
