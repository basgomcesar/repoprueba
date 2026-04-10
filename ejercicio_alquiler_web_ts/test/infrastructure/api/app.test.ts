import request from 'supertest';
import { app, server } from '../../../src/infrastructure/api/app';
import User from '../../../src/domain/User';
import Car from '../../../src/domain/Car';
import { RentalType } from '../../../src/domain/enums/RentalType';
import InMemoryUserRepository from '../../../src/infrastructure/InMemoryUserRepository';
import InMemoryCarRepository from '../../../src/infrastructure/InMemoryCarRepository';

afterAll(() => {
  server.close();
});

describe('Tests para el endpoint POST /api/rentals', () => {

  beforeAll(() => {
    InMemoryUserRepository.users.push(new User("1", 'John Doe', 'john.doe@example.com'));
    InMemoryCarRepository.cars.push(new Car("4523", "H1-2020", "2020", "available"));
  });


  it('El endpoint POST /api/rentals debe crear un nuevo alquiler de un auto con exito', async () => {

    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryUserRepository.users[0].getUserId(),
        carId: InMemoryCarRepository.cars[0].getCarId(),
        rentalType: RentalType.DAILY,
        rentalTime: 3,
        startDate: new Date().toISOString()
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('rentalId');
    expect(response.body).toHaveProperty('userId', InMemoryUserRepository.users[0].getUserId());
    expect(response.body).toHaveProperty('carId', InMemoryCarRepository.cars[0].getCarId());
    expect(response.body).toHaveProperty('rentalType', 'daily');
    expect(response.body).toHaveProperty('startDate');
  });

  it('El endpoint POST /api/rentals debe retornar un error si el auto no esta disponible', async () => {

    await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryUserRepository.users[0].getUserId(),
        carId: InMemoryCarRepository.cars[0].getCarId(),
        rentalType: RentalType.HOURLY,
        rentalTime: 3,
        startDate: new Date().toISOString()
      });

    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryUserRepository.users[0].getUserId(),
        carId: InMemoryCarRepository.cars[0].getCarId(),
        rentalType: RentalType.HOURLY,
        rentalTime: 3,
        startDate: new Date().toISOString()
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'El auto no está disponible para alquiler');
  });

  it('El endpoint POST /api/rentals debe retornar un error si el usuario no existe', async () => {

    InMemoryCarRepository.cars[0].setStatus("available");

    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: 'nonexistentUser',
        carId: InMemoryCarRepository.cars[0].getCarId(),
        rentalType: RentalType.DAILY,
        rentalTime: 3,
        startDate: new Date().toISOString() 
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Usuario no encontrado');
  });

  it('El endpoint POST /api/rentals debe retornar un error si el auto no existe', async () => {

    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryUserRepository.users[0].getUserId(),
        carId: 'nonexistentCar',
        rentalType: RentalType.DAILY,
        rentalTime: 3,
        startDate: new Date().toISOString()
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Auto no encontrado');
  });

  it('El endpoint POST /api/rentals debe retornar un error si la fecha de inicio no es válida', async () => {

    const response = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryUserRepository.users[0].getUserId(),
        carId: InMemoryCarRepository.cars[0].getCarId(),
        rentalType: RentalType.DAILY,
        rentalTime: 3,
        startDate: 'invalid-date'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Fecha de inicio no válida');
  });
});

describe('Tests para el endpoint POST /api/rentals/return', () => {
  beforeAll(() => {
    InMemoryUserRepository.users.push(new User("3456", 'Jane Doe', 'jane.doe@example.com'));
    InMemoryCarRepository.cars.push(new Car("5678", "H2-2020", "2020", "available"));
  });

  it('El endpoint POST /api/rentals/return debe retornar el monto total a facturar por el alquiler y la ganancia obtenida por la agencia', async () => {
    // Crear un alquiler para el auto
    const rentalResponse = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryUserRepository.users[0].getUserId(),
        carId: InMemoryCarRepository.cars[0].getCarId(),
        rentalType: RentalType.DAILY,
        rentalTime: 3,
        startDate: new Date().toISOString()
      });

    // Llamada al endpoint POST /api/rentals/return
    const response = await request(app)
      .post('/api/rentals/return/' + rentalResponse.body.rentalId)
      .send({
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
      .post('/api/rentals/return/nonexistentRental')
      .send({
        returnDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea un error
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Alquiler no encontrado');
  });

  it('El endpoint POST /api/rentals/return debe retornar un error si el alquiler ya fue devuelto', async () => {
    // Crear un alquiler para el auto
    const rentalResponse = await request(app)
      .post('/api/rentals')
      .send({
        userId: InMemoryUserRepository.users[0].getUserId(),
        carId: InMemoryCarRepository.cars[0].getCarId(),
        rentalType: RentalType.DAILY,
        rentalTime: 3,
        startDate: new Date().toISOString()
      });

    // Devolver el alquiler
    await request(app)
      .post('/api/rentals/return/' + rentalResponse.body.rentalId)
      .send({
        returnDate: new Date().toISOString()
      });

    // Intentar devolver el mismo alquiler nuevamente
    const response = await request(app)
      .post('/api/rentals/return/' + rentalResponse.body.rentalId)
      .send({
        returnDate: new Date().toISOString()
      });

    // Verificar que la respuesta sea un error
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Alquiler ya ha sido devuelto');
  });
});
