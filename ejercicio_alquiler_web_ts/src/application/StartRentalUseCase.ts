import RentalRepository from "../application/RentalRepository";
import Rental from "../domain/Rental";
import { randomUUID } from "crypto";
import { UserRepository } from "./ports/UserRepository";
import { CarRepository } from "./ports/CarRepository";


export class StartRentalUseCase {

  private readonly rentalRepository: RentalRepository;
  private readonly carsRepository: CarRepository;
  private readonly usersRepository: UserRepository;

  constructor(rentalRepository: RentalRepository, carsRepository: CarRepository, usersRepository: UserRepository) {
    this.rentalRepository = rentalRepository;
    this.carsRepository = carsRepository;
    this.usersRepository = usersRepository;
  }

  execute(userId: string, carId: string, rentalType: string, rentalTime: number, startDate: Date): Rental {
    

    if (!this.carsRepository.exists(carId)) {
      throw new Error("Auto no encontrado");
    }

    if (!this.carsRepository.isAvailable(carId)) {
      throw new Error("El auto no está disponible para alquiler");
    }

    if (!this.usersRepository.exists(userId)) {
      throw new Error("Usuario no encontrado");
    }

    const rentalId = randomUUID().toString();
    const rental = new Rental(rentalId, userId, carId, rentalTime, rentalType, startDate.toISOString());
    this.rentalRepository.createRental(rental);
    this.carsRepository.updateAvailability(carId, false);
     
    return rental;
  }
}
