import StartRentalUseCase from "../../src/application/StartRentalUseCase";
import { RentalRepository } from "../../src/domain/RentalRepository";
import { RentalSummary } from "../../src/domain/RentalSummary";
//Se hacen test cases para el caso de uso StartRentalUseCase,
describe("Tests para el caso de uso StartRentalUseCase", () => {
  it("Se crea un alquiler con exito y se devuelve un summary del alquiler creado", async () => {
    // Crear un mock del RentalRepository
    const rentalRepositoryMock = {
      createRental: jest.fn().mockResolvedValue({
        id: "rental123",
        userId: "user123",
        carId: "car123",
        rentalType: "daily",
        startDate: new Date().toISOString()
      })
    };

    const startRentalUseCase = new StartRentalUseCase(rentalRepositoryMock as RentalRepository);

    const rentalSummary: RentalSummary = await startRentalUseCase.execute({
      userId: "user123",
      carId: "car123",
      rentalType: "daily",
      startDate: new Date().toISOString()
    });

    expect(rentalSummary).toBeDefined();
    expect(rentalSummary).toHaveProperty("rentalId", "rental123");
    expect(rentalSummary).toHaveProperty("userId", "user123");
  });

  it("Se intenta crear un alquiler para un auto que no está disponible y se devuelve un error", async () => {
    // Crear un mock del RentalRepository que simule que el auto no está disponible
    const rentalRepositoryMock = {
      createRental: jest.fn().mockRejectedValue(new Error("El auto no está disponible para alquiler"))
    };

    const startRentalUseCase = new StartRentalUseCase(rentalRepositoryMock as RentalRepository);

    await expect(startRentalUseCase.execute({
      userId: "user123",
      carId: "car123",
      rentalType: "daily",
      startDate: new Date().toISOString()
    })).rejects.toThrow("El auto no está disponible para alquiler");
  });

  it("Se intenta crear un alquiler para un usuario que no existe y se devuelve un error", async () => {
    // Crear un mock del RentalRepository que simule que el usuario no existe
    const rentalRepositoryMock = {
      createRental: jest.fn().mockRejectedValue(new Error("Usuario no encontrado"))
    };

    const startRentalUseCase = new StartRentalUseCase(rentalRepositoryMock as RentalRepository);

    await expect(startRentalUseCase.execute({
      userId: "user123",
      carId: "car123",
      rentalType: "daily",
      startDate: new Date().toISOString()
    })).rejects.toThrow("Usuario no encontrado");
  });

  it("Se intenta crear un alquiler para un auto que no existe y se devuelve un error", async () => {
    // Crear un mock del RentalRepository que simule que el auto no existe
    const rentalRepositoryMock = {
      createRental: jest.fn().mockRejectedValue(new Error("Auto no encontrado"))
    };

    const startRentalUseCase = new StartRentalUseCase(rentalRepositoryMock as RentalRepository);

    await expect(startRentalUseCase.execute({
      userId: "user123",
      carId: "car123",
      rentalType: "daily",
      startDate: new Date().toISOString()
    })).rejects.toThrow("Auto no encontrado");
  });
});
