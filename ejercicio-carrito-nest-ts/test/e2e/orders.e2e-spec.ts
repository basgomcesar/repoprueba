import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-12345')
}));

describe('Test cases to Orders', () => {
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

    describe('POST /orders', () => {
        it('Should create an order', async () => {
            const payload = {
                userId: 'mock-uuid-12345',
                productIds: ['product-1', 'product-2'],
            };
            const response = await request(app.getHttpServer())
                .post('/orders')
                .send(payload)
                .expect(201);
        });
    });

});