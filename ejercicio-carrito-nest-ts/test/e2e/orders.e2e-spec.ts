import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid-12345')
}));

describe('Test cases to Orders', () => {
    let app: INestApplication;
    
    const testProduct = {
        sku: 'PRD-001',
        name: 'Producto de Prueba',
        price: 10.99,
        stock: 100
    };

    const testUser = {
        name: 'Usuario Test',
        email: 'usuario@test.com',
        phone: '3234567890'
    };

    const testCartItem = {
        sku: 'PRD-001',
        quantity: 2
    };

    let createdProductSku: string;
    let createdUserPhone: string;

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


    describe('GET /orders', () => {
        it('Should return all orders', async () => {

            const productResponse = await request(app.getHttpServer())
                .post('/products')
                .send(testProduct)
                .expect(201);
            createdProductSku = productResponse.body.sku;

            const userResponse = await request(app.getHttpServer())
                .post('/users')
                .send(testUser)
                .expect(201);
            createdUserPhone = userResponse.body.phone;

            await request(app.getHttpServer())
                .post(`/carts/add/${createdUserPhone}`)
                .send({
                    sku: createdProductSku,
                    quantity: testCartItem.quantity
                })
                .expect(201);

            await request(app.getHttpServer())
                .post(`/carts/checkout/${createdUserPhone}`)
                .expect(201);

            const res = await request(app.getHttpServer())
                .get('/orders')
                .expect(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);

        });
    });

});