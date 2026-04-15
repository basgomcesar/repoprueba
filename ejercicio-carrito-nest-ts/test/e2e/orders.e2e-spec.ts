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

    describe('GET /orders', () => {
        it('Should return all orders', async () => {
            const res = await request(app.getHttpServer())
                .get('/orders')
                .expect(200);
            expect(res.text).toBe("This endpoint will return all orders");
        });
    });

});