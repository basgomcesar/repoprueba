import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type CartsRepository from './CartsRepository';
import type UsersRepository from '../../users/application/UserRepository';
import type ProductRepository from '../../products/application/ProductRepository';
import { CartItem } from '../domain/CartItem';
import Order from '../../orders/domain/Order';

@Injectable()
export class CartsService {

    constructor(@Inject('CartsRepository') private cartsRepository: CartsRepository,
        @Inject('UsersRepository') private usersRepository: UsersRepository,
        @Inject('ProductRepository') private productsRepository: ProductRepository
    ) { }

    addProductToCart(phoneNumber: string, sku: string, quantity: number) {
        const user = this.usersRepository.getUserByPhone(phoneNumber);
        const product = this.productsRepository.getProductBySKU(sku);

        if (!product) {
            throw new BadRequestException('Producto no encontrado');
        }
        if (product.getStock() < quantity) {
            throw new BadRequestException('Stock insuficiente');
        }
        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }
        const cart = this.cartsRepository.addProductToCart(user, sku, quantity);
        const item = cart.getItemCarts().find(item => item.getProduct().getSKU() === sku);
        if (item) {
            const newQuantity = item.getQuantity() + quantity;
            if (product.getStock() < newQuantity) {
                throw new BadRequestException('Stock insuficiente para la cantidad solicitada');
            }
            item.setQuantity(newQuantity);
            cart.setTotal(newQuantity * product.getPrice());
            cart.saveItemCart(item);
        } else {
            const newCartItem = new CartItem(product, quantity);
            cart.addProduct(newCartItem.getProduct(), newCartItem.getQuantity());
            cart.setTotal(product.getPrice() * newCartItem.getQuantity());
            cart.saveItemCart(newCartItem);
        }

        this.cartsRepository.saveCart(cart);

        return cart;
    }

    getCartByUser(phoneNumber: string) {
        const user = this.usersRepository.getUserByPhone(phoneNumber);
        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }
        const cart = this.cartsRepository.getCartByUser(user);
        if (!cart) {
            throw new BadRequestException('Carrito no encontrado para el usuario');
        }
        return cart;
    }

    checkoutCart(phone: string): Order {

        const user = this.usersRepository.getUserByPhone(phone)
        if (!user) {
            throw new BadRequestException("Usuario no encontrado");
        }

        const cart = this.cartsRepository.getCartByUser(user);
        if (!cart) {
            throw new BadRequestException("Carrito no encontrado");
        }

        const itemsCart = cart.getItemCarts();

        if (itemsCart.length === 0) {
            throw new BadRequestException("El carrito está vacío");
        }

        cart.verifyIfProductsInStock();

        for (const item of itemsCart) {
            const product = item.getProduct();
            const newStock = product.getStock() - item.getQuantity();
            product.setStock(newStock);
            this.productsRepository.updateProduct(product);
        }

        const total = cart.getTotal();

        this.cartsRepository.clearCart(user);

        return new Order(total, itemsCart, parseInt(user.getId()));
    }
}
