import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import type UsersRepository from '../application/UserRepository';
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-12345')
}));

describe('UsersService', () => {
  let service: UsersService;



  const mockUsersRepository = {
    saveUser: jest.fn().mockImplementation((user) => {
      return { ...user, id: 1 };
    }),
    getAllUsers: jest.fn().mockReturnValue([]),
    findUserByPhone: jest.fn().mockReturnValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UsersRepository',
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', () => {
    mockUsersRepository.findUserByPhone.mockReturnValue(null);

    const userDto = { name: 'Cesar Basilio', email: 'cesar.basilio@example', phone: '1234567890' };
    const result = service.create(userDto);

    expect(result).toEqual({ id: 1, name: 'Cesar Basilio', email: 'cesar.basilio@example', phone: '1234567890' });
    expect(mockUsersRepository.saveUser).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Cesar Basilio',
      email: 'cesar.basilio@example',
      phone: '1234567890'
    }));
  });

  it('should throw an error if required fields are missing', () => {
    expect(() => service.create({ name: '', email: '', phone: '' })).toThrow('Faltan campos obligatorios');
  });

  it('should throw a ConflictException if phone number is already registered', () => {
    mockUsersRepository.findUserByPhone.mockReturnValue(true);
    expect(() => service.create({ name: 'Cesar Basilio', email: 'cesar.basilio@example', phone: '1234567890' })).toThrow('El número de teléfono ya está registrado');
  });

});
