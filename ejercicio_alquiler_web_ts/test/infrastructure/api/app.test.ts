import request from 'supertest';
import { app, server } from '../../../src/infrastructure/api/app';
import InMemoryRentalRepository from '../../../src/infrastructure/InMemoryRentalRepository';

afterAll(() => {
  server.close();
});

describe('Tests para el endpoint POST /api/rentals', () => {
  beforeAll(() => {
    InMemoryRentalRepository.users.push({
      id: 'user123',
      name: 'John Doe',
      email: 'john.doe@example.com'
    });
    InMemoryRentalRepository.cars.push({
      id: 'car123',
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      available: true
    });
  });


  it('El endpoint POST /api/rentals debe crear un nuevo alquiler de un auto con exito', async () => {

    // Llamada al endpoint POST /api/rentals
    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryRentalRepository.users[0].id,
        carId: InMemoryRentalRepository.cars[0].id,
        rentalType: 'daily',
        startDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea exitosa    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('rentalId');
    expect(response.body).toHaveProperty('userId', InMemoryRentalRepository.users[0].id);
    expect(response.body).toHaveProperty('carId', InMemoryRentalRepository.cars[0].id);
    expect(response.body).toHaveProperty('rentalType', 'daily');
    expect(response.body).toHaveProperty('startDate');
  });

  it('El endpoint POST /api/rentals debe retornar un error si el auto no esta disponible', async () => {

    // Crear un alquiler para que el auto no esté disponible
    await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryRentalRepository.users[0].id,
        carId: InMemoryRentalRepository.cars[0].id,
        rentalType: 'hourly',
        startDate: new Date().toISOString()
      });

    // Intentar crear otro alquiler para el mismo auto
    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryRentalRepository.users[0].id,
        carId: InMemoryRentalRepository.cars[0].id,
        rentalType: 'hourly',
        startDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea un error
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Car is not available for rental');
  });

  it('El endpoint POST /api/rentals debe retornar un error si el usuario no existe', async () => {

    // Intentar crear un alquiler con un usuario que no existe
    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: 'nonexistentUser',
        carId: InMemoryRentalRepository.cars[0].id,
        rentalType: 'daily',
        startDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea un error
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('El endpoint POST /api/rentals debe retornar un error si el auto no existe', async () => {

    // Intentar crear un alquiler con un auto que no existe
    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryRentalRepository.users[0].id,
        carId: 'nonexistentCar',
        rentalType: 'daily',
        startDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea un error
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Car not found');
  });
});

describe('Tests para el endpoint POST /api/rentals/return', () => {
  beforeAll(() => {
    InMemoryRentalRepository.users.push({
      id: 'user456',
      name: 'Jane Doe',
      email: 'jane.doe@example.com'
    });
    InMemoryRentalRepository.cars.push({
      id: 'car456',
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      available: true
    });
  });

  it('El endpoint POST /api/rentals/return debe retornar el monto total a facturar por el alquiler y la ganancia obtenida por la agencia', async () => {
    // Crear un alquiler para el auto
    const rentalResponse = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryRentalRepository.users[0].id,
        carId: InMemoryRentalRepository.cars[0].id,
        rentalType: 'daily',
        startDate: new Date().toISOString()
      });

    // Llamada al endpoint POST /api/rentals/return
    const response = await request(app)
      .post('/api/rentals/return')
      .send({
        rentalId: rentalResponse.body.rentalId,
        returnDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea exitosa
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalAmount');
    expect(response.body).toHaveProperty('agencyProfit'); 
  });

  it('El endpoint POST /api/rentals/return debe retornar un error si el alquiler no existe', async () => {
    // Intentar devolver un alquiler que no existe
    const response = await request(app)
      .post('/api/rentals/return')
      .send({
        rentalId: 'nonexistentRental',
        returnDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea un error
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Rental not found');
  });

  it('El endpoint POST /api/rentals/return debe retornar un error si el alquiler ya fue devuelto', async () => {
    // Crear un alquiler para el auto
    const rentalResponse = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryRentalRepository.users[0].id,
        carId: InMemoryRentalRepository.cars[0].id,
        rentalType: 'daily',
        startDate: new Date().toISOString()
      });

    // Devolver el alquiler
    await request(app)
      .post('/api/rentals/return')
      .send({
        rentalId: rentalResponse.body.rentalId,
        returnDate: new Date().toISOString()
      });

    // Intentar devolver el mismo alquiler nuevamente
    const response = await request(app)
      .post('/api/rentals/return')
      .send({
        rentalId: rentalResponse.body.rentalId,
        returnDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea un error
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Rental has already been returned');
  });
});
