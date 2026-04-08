import RentalRepository from "../application/RentalRepository";
import Rental from "../domain/Rental";
import { randomUUID } from "crypto";


export class StartRentalUseCase {

  private readonly rentalRepository: RentalRepository;

  constructor(rentalRepository: RentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  execute(userId: string, carId: string, rentalType: string, rentalTime: number, startDate: Date): Rental {
    

    if (!this.rentalRepository.isCarExists(carId)) {
      throw new Error("Auto no encontrado");
    }

    if (!this.rentalRepository.isCarAvailable(carId)) {
      throw new Error("El auto no está disponible para alquiler");
    }

    if (!this.rentalRepository.isUserExists(userId)) {
      throw new Error("Usuario no encontrado");
    }

    const rentalId = randomUUID().toString();
    const rental = new Rental(rentalId, userId, carId, rentalTime, rentalType, startDate.toISOString());
    this.rentalRepository.createRental(rental);
    this.rentalRepository.updateCarAvailability(carId, false);
     
    return rental;
  }
}
