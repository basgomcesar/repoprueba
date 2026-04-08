import ReturnCarUseCase from "../../src/application/ReturnCarUseCase";
import Rental from "../../src/domain/Rental";

describe("Tests para el caso de uso ReturnCarUseCase", () => {
  it("Deberia hacer la devolucion de un auto con exito", async () => {
 const rental = new Rental("r1", "u1", "c1", 2, "hourly", "2026-04-08T10:00:00.000Z");

  const rentalRepository = {
    getRentalById: jest.fn().mockReturnValue(rental),
    updateRental: jest.fn(),
    updateCarAvailability: jest.fn(),
    isUserExists: jest.fn(),
    isCarAvailable: jest.fn(),
    isCarExists: jest.fn(),
    createRental: jest.fn(),
  };

  const useCase = new ReturnCarUseCase(rentalRepository as any);

  const returnedRental = await useCase.execute("r1", new Date("2026-04-08T12:00:00.000Z"));

  expect(rentalRepository.updateRental).toHaveBeenCalledTimes(1);
  expect(returnedRental.getEndDate()).toBe("2026-04-08T12:00:00.000Z");
  expect(returnedRental.getTotalAmount()).toBe(10); 
  expect(returnedRental.getAgencyProfit()).toBe(2.5); 
  expect(rentalRepository.updateCarAvailability).toHaveBeenCalledWith("c1", true);
  });

  it("Deberia lanzar un error si el alquiler no existe", async () => {
    const rentalRepository = {
      getRentalById: jest.fn().mockReturnValue(null),
      updateRental: jest.fn(),
      updateCarAvailability: jest.fn(),
      isUserExists: jest.fn(),
      isCarAvailable: jest.fn(),
      isCarExists: jest.fn(),
      createRental: jest.fn(),
    };

    const useCase = new ReturnCarUseCase(rentalRepository as any);

    await expect(useCase.execute("r1", new Date("2026-04-08T12:00:00.000Z"))).rejects.toThrow("Alquiler no encontrado");
  });

  it("Deberia calcular correctamente el monto total y la ganancia para alquileres diarios", async () => {
    const rental = new Rental("r1", "u1", "c1", 3, "daily", "2026-04-08T10:00:00.000Z");

    const rentalRepository = {
      getRentalById: jest.fn().mockReturnValue(rental),
      updateRental: jest.fn(),
      updateCarAvailability: jest.fn(),
      isUserExists: jest.fn(),
      isCarAvailable: jest.fn(),
      isCarExists: jest.fn(),
      createRental: jest.fn(),
    };

    const useCase = new ReturnCarUseCase(rentalRepository as any);

    const returnedRental = await useCase.execute("r1", new Date("2026-04-11T10:00:00.000Z"));

    expect(returnedRental.getTotalAmount()).toBe(60); 
    expect(returnedRental.getAgencyProfit()).toBe(15); 
  });
});
