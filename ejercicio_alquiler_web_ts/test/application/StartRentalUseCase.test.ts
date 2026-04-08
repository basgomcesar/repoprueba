import {StartRentalUseCase} from "../../src/application/StartRentalUseCase";
import RentalRepository from "../../src/application/RentalRepository";
import Rental from "../../src/domain/Rental";
//Se hacen test cases para el caso de uso StartRentalUseCase,
describe("Tests para el caso de uso StartRentalUseCase", () => {
  it("Se crea un alquiler con exito y se devuelve un summary del alquiler creado", async () => {
    // Crear un mock del RentalRepository
    const rentalRepositoryMock = {
      createRental: jest.fn().mockResolvedValue(new Rental("rental123", "user123", "car123", "daily", new Date().toISOString())),
      isCarExists: jest.fn().mockReturnValue(true),
      isCarAvailable: jest.fn().mockReturnValue(true),
      isUserExists: jest.fn().mockReturnValue(true)
    };

    const startRentalUseCase = new StartRentalUseCase(rentalRepositoryMock as RentalRepository);

    const rentalSummary: Rental = startRentalUseCase.execute(
      "123",
      "234",
      "daily",
      new Date());

    expect(rentalSummary).toBeDefined();
    // Verificar el uuid del alquiler generado
    expect(rentalSummary).toHaveProperty("rentalId", expect.any(String));
    expect(rentalSummary).toHaveProperty("carId", expect.any(String));
    expect(rentalSummary).toHaveProperty("rentalType", "daily");
    expect(rentalSummary).toHaveProperty("startDate", expect.any(String));
    expect(rentalSummary).toHaveProperty("userId", expect.any(String));
  });

  it("Se intenta crear un alquiler para un auto que no está disponible y se devuelve un error", async () => {
    // Crear un mock del RentalRepository que simule que el auto no está disponible
    const rentalRepositoryMock = {
      createRental: jest.fn().mockRejectedValue(new Error("El auto no está disponible para alquiler")),
      isCarExists: jest.fn().mockReturnValue(true),
      isCarAvailable: jest.fn().mockReturnValue(false),
      isUserExists: jest.fn().mockReturnValue(true)
    };

    const startRentalUseCase = new StartRentalUseCase(rentalRepositoryMock as RentalRepository);

    await expect(() => startRentalUseCase.execute("123", "234", "daily", new Date())).toThrow("El auto no está disponible para alquiler");
  });

  it("Se intenta crear un alquiler para un usuario que no existe y se devuelve un error", async () => {
    // Crear un mock del RentalRepository que simule que el usuario no existe
    const rentalRepositoryMock = {
      createRental: jest.fn().mockRejectedValue(new Error("Usuario no encontrado")),
      isCarExists: jest.fn().mockReturnValue(true),
      isCarAvailable: jest.fn().mockReturnValue(true),
      isUserExists: jest.fn().mockReturnValue(false)

    };

    const startRentalUseCase = new StartRentalUseCase(rentalRepositoryMock as RentalRepository);

    await expect(() => startRentalUseCase.execute("123", "234", "daily", new Date())).toThrow("Usuario no encontrado");
  });

  it("Se intenta crear un alquiler para un auto que no existe y se devuelve un error", async () => {
    // Crear un mock del RentalRepository que simule que el auto no existe
    const rentalRepositoryMock = {
      createRental: jest.fn().mockRejectedValue(new Error("Auto no encontrado")),
      isCarExists: jest.fn().mockReturnValue(false),
      isCarAvailable: jest.fn().mockReturnValue(true),
      isUserExists: jest.fn().mockReturnValue(true)
    };

    const startRentalUseCase = new StartRentalUseCase(rentalRepositoryMock as RentalRepository);

    await expect(() => startRentalUseCase.execute("123", "234", "daily", new Date())).toThrow("Auto no encontrado");
  });
});
