import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { InMemoryProducts } from './../../src/products/infrastructure/InMemoryProducts';
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-12345')
}));

describe('Test cases to Products', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /products', () => {
    it('Should create a product', async () => {
      const payload = {
        name: 'Arroz',
        sku: 'ARZ-001',
        stock: 10,
        price: 50,
      };

      const res = await request(app.getHttpServer())
        .post('/products')
        .send(payload)
        .expect(201);

      expect(res.body).toEqual(
        expect.objectContaining({
          name: payload.name,
          sku: payload.sku,
          stock: payload.stock,
          price: payload.price,
        }),
      );
    });

    it('400 - should reject missing fields', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .send({
          sku: 'BAD-001',
        })
        .expect(400);
    });

    it('409 - should reject duplicated sku', async () => {
      const payload = {
        name: 'Cookies',
        sku: 'COO-001',
        stock: 5,
        price: 25.5,
      };

      await request(app.getHttpServer()).post('/products').send(payload).expect(201);
      await request(app.getHttpServer()).post('/products').send(payload).expect(409);
    });
  });

  describe('GET /products', () => {
    beforeEach(async () => {
      const res = await request(app.getHttpServer()).get('/products');
    });

    it('200 - should list products', async () => {
      const p1 = {
        name: 'Beans',
        sku: 'BEA-001',
        stock: 7,
        price: 80,
      };

      await request(app.getHttpServer()).post('/products').send(p1).expect(201);

      const res = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ sku: 'BEA-001' }),
        ]),
      );
    });

    it('200 - should return empty array if no products', async () => {
      InMemoryProducts.products = [];
      const res = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toEqual([]);
    });


  });

  describe('PUT /products/update-stock/:sku', () => {
    it('200 - should update stock', async () => {
      const payload = {
        name: 'Cake',
        sku: 'CAK-001',
        stock: 3,
        price: 300,
      };

      await request(app.getHttpServer()).post('/products').send(payload).expect(201);

      const res = await request(app.getHttpServer())
        .put('/products/update-stock/CAK-001')
        .send({ stock: 12 })
        .expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({
          sku: 'CAK-001',
          stock: 12,
        }),
      );
    });

    it('404 - should return not found for unknown sku', async () => {
      await request(app.getHttpServer())
        .put('/products/update-stock/NOPE-999')
        .send({ stock: 1 })
        .expect(404);
    });

    it('400 - should reject negative stock', async () => {
      const payload = {
        name: 'Headphones',
        sku: 'HEA-001',
        stock: 2,
        price: 120,
      };

      await request(app.getHttpServer()).post('/products').send(payload).expect(201);

      await request(app.getHttpServer())
        .put('/products/update-stock/HEA-001')
        .send({ stock: -1 })
        .expect(400);
    });
  });
});