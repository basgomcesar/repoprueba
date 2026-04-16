import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import InMemoryUsers from './../../src/users/infrastructure/InMemoryUsers';
import User from '../../src/users/domain/entities/User';
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-12345')
}));


describe('Test cases to Users', () => {

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

    describe('POST /users', () => {
        it('Should create a user', async () => {
            const payload = {
                name: 'Cesar Basilio',
                email: 'cesar.basilio@example.com',
                phone: '1234567890',
            };

            const res = await request(app.getHttpServer())
                .post('/users')
                .send(payload)
                .expect(201);

            expect(res.body).toEqual(
                expect.objectContaining({
                    name: payload.name,
                    email: payload.email,
                }),
            );
        });

        it('400 - should reject missing fields', async () => {
            await request(app.getHttpServer())
                .post('/users')
                .send({
                    email: 'cesar.basilio@example.com',
                })
                .expect(400);
        });

        it('400 - should reject invalid email', async () => {
            await request(app.getHttpServer())
                .post('/users')
                .send({
                    name: 'Cesar Basilio',
                    email: 'invalid-email',
                    phone: '1234567890',
                })
                .expect(400);
        });

        it('409 - should reject duplicated phone', async () => {
            const payload = {
                name: 'Cesar Basilio',
                email: 'cesar2.basilio@example.com',
                phone: '1234567892',
            };

            await request(app.getHttpServer())
                .post('/users')
                .send(payload)
                .expect(201);

            await request(app.getHttpServer())
                .post('/users')
                .send(payload)
                .expect(409);
        });

        it('409 - should reject duplicated email', async () => {
            const payload = {
                name: 'Cesar Basilio',
                email: 'cesar3.basilio@example.com',
                phone: '1234567894',
            };

            await request(app.getHttpServer())
                .post('/users')
                .send(payload)
                .expect(201);

            await request(app.getHttpServer())
                .post('/users')
                .send(payload)
                .expect(409);
        });
    });

    describe('GET /users', () => {
        beforeEach(async () => {
            InMemoryUsers.users = [];
            const res = await request(app.getHttpServer()).get('/users');
        });

        it('200 - should list users', async () => {
            const u1 = {
                name: 'Cesar Basilio',
                email: 'cesar.basilio@example.com',
                phone: '1234567890',
            };

            await request(app.getHttpServer())
                .post('/users')
                .send(u1)
                .expect(201);
        });

        it('200 - should list users', async () => {
            InMemoryUsers.users = [new User('1', 'Cesar Basilio', 'cesar.basilio@example.com', '1234567890')];
            const res = await request(app.getHttpServer()).get('/users');
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: 'Cesar Basilio',
                        email: 'cesar.basilio@example.com',
                        phone: '1234567890',
                    }),
                ])
            );
        });

        it('200 - should return empty array if no users', async () => {
            InMemoryUsers.users = [];
            const res = await request(app.getHttpServer())
                .get('/users')
                .expect(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toEqual([]);
        });
    });

    describe('GET /users/:phone', () => {
        it('200 - should get user by phone', async () => {
            const u1 = {
                name: 'Cesar Basilio',
                email: 'cesar.basilio@example.com',
                phone: '1234567890',
            };
            await request(app.getHttpServer())
                .post('/users')
                .send(u1)
                .expect(201);

            const res = await request(app.getHttpServer())
                .get(`/users/${u1.phone}`)
                .expect(200);

            expect(res.body).toEqual(
                expect.objectContaining({
                    name: u1.name,
                    email: u1.email,
                    phone: u1.phone,
                })
            );
        });

        it('404 - should return 404 if user not found', async () => {
            await request(app.getHttpServer())
                .get('/users/2123456789')
                .expect(404);
        });

        it('400 - should return 400 for invalid phone format', async () => {
            await request(app.getHttpServer())
                .get('/users/invalid-phone')
                .expect(400);
        });
    });
});