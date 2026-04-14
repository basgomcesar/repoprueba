import { Inject, Injectable } from '@nestjs/common';
import type ProductRepository from './ProductRepository';
import { Product } from './Product';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class ProductsService {

    constructor( @Inject('ProductsRepository') private readonly ProductsRepository: ProductRepository) {}

    create(product: { name: string; sku: string; stock: number; price: number }) : Product {
        console.log(product);
        if (!product.name || !product.sku || product.stock === undefined || product.price === undefined) {
            throw new Error('Faltan campos obligatorios');
        }
        if (product.sku && this.ProductsRepository.findProductBySKU(product.sku)) {
            throw new ConflictException('El SKU ya existe');
        }
        return this.ProductsRepository.saveProduct(new Product(0, product.name, product.price, product.sku, product.stock));
    }
}
