import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import User from '../../src/users/domain/entities/User';
import InMemoryUsers from '../../src/users/infrastructure/InMemoryUsers';
import { InMemoryProducts } from '../../src/products/infrastructure/InMemoryProducts';
import { Product } from '../../src/products/domain/entities/Product';
import InMemoryCarts from '../../src/carts/infrastructure/InMemoryCarts';
import Cart from '../../src/carts/domain/Cart';

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid-12345')
}));

describe('Test cases to Cart', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /carts', () => {
        InMemoryUsers.users.push(new User('mock-uuid-12345', 'Cesar Basilio', 'cesar.basilio@example.com', '3234567890'));
        InMemoryProducts.products.push(new Product('product-1', 'Product 1', 10.99, 'PRD-001', 10));


        it('Should add a product to the cart', async () => {
            const payload = {
                sku: 'PRD-001',
                quantity: 2,
            };
            const response = await request(app.getHttpServer())
                .post('/carts/add/3234567890')
                .send(payload)
                .expect(201);
        });

        it('400 - should reject missing fields', async () => {
            await request(app.getHttpServer())
                .post('/carts/add/3234567890')
                .send({ quantity: 2 })
                .expect(400);
        });

        it('400 - should reject non-existing user', async () => {
            const payload = {
                sku: 'PRD-001',
                quantity: 2,
            };
            await request(app.getHttpServer())
                .post('/carts/add/0000000000')
                .send(payload)
                .expect(400);
        });

        it('400 - should reject non-existing product', async () => {
            const payload = {
                sku: 'non-existing-product',
                quantity: 2,
            };
            await request(app.getHttpServer())
                .post('/carts/add/3234567890')
                .send(payload)
                .expect(400);
        });

        it('400 - should reject insufficient stock', async () => {
            const payload = {
                sku: 'PRD-001',
                quantity: 20,
            };
            await request(app.getHttpServer())
                .post('/carts/add/3234567890')
                .send(payload)
                .expect(400);
        });

        it('400 - should reject invalid quantity', async () => {
            const payload = {
                sku: 'PRD-001',
                quantity: -1,
            };
            await request(app.getHttpServer())
                .post('/carts/add/3234567890')
                .send(payload)
                .expect(400);
        });

    });

    describe('GET /carts/:phoneNumber', () => {
        it('Should get the cart for a user', async () => {
            const response = await request(app.getHttpServer())
                .get('/carts/3234567890')
                .expect(200);
        });

        it('400 - should reject non-existing user', async () => {
            await request(app.getHttpServer())
                .get('/carts/0000000000')
                .expect(400);
        });

        it('400 - should reject invalid phone number', async () => {
            await request(app.getHttpServer())
                .get('/carts/invalid-phone')
                .expect(400);
        });
    });

    describe('POST /carts/checkout/:phoneNumber', () => {
        InMemoryUsers.users.push(new User('mock-uuid-12345', 'Cesar Basilio', 'cesar.basilio@example.com', '3234567890'));
        InMemoryProducts.products.push(new Product('product-1', 'Product 1', 10.99, 'PRD-001', 10));
        InMemoryCarts.carts.push(new Cart(new User('mock-uuid-12345', 'Cesar Basilio', 'cesar.basilio@example.com', '3234567890')));

        it('Should checkout the cart for a user', async () => {
            const response = await request(app.getHttpServer())
                .post('/carts/checkout/3234567890')
                .expect(201);
        });

        it('400 - should reject non-existing user', async () => {
            await request(app.getHttpServer())
                .post('/carts/checkout/0000000000')
                .expect(400);
        });

        it('400 - should reject empty cart', async () => {
            await request(app.getHttpServer())
                .post('/carts/checkout/3234567890')
                .expect(400);
        });

        it('400 - should reject invalid phone number', async () => {
            await request(app.getHttpServer())
                .post('/carts/checkout/invalid-phone')
                .expect(400);
        });

        it('400 - should reject insufficient stock during checkout', async () => {
            const payload = {
                sku: 'PRD-001',
                quantity: 20,
            };
            await request(app.getHttpServer())
                .post('/carts/add/3234567890')
                .send(payload)
                .expect(400);
        });
    });
});