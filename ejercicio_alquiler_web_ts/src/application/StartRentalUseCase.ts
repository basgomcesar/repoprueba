import RentalRepository from "../application/RentalRepository";
import Rental from "../domain/Rental";
import { randomUUID } from "crypto";


export class StartRentalUseCase {

  private readonly rentalRepository: RentalRepository;

  constructor(rentalRepository: RentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  execute(userId: string, carId: string, rentalType: string, startDate: Date): Rental {
    
    // Este use case registra un nuevo alquiler en el sistema.
    // 1. Verifica que el auto exista en el sistema.
    if (!this.rentalRepository.isCarExists(carId)) {
      throw new Error("Auto no encontrado");
    }
    // 2. Verifica que el auto este disponible para alquiler.
    if (!this.rentalRepository.isCarAvailable(carId)) {
      throw new Error("El auto no está disponible para alquiler");
    }
    // 3. Verifica que el usuario exista en el sistema.
    if (!this.rentalRepository.isUserExists(userId)) {
      throw new Error("Usuario no encontrado");
    }
    // 4. Crea un nuevo alquiler con el estado "active" y el startDate proporcionado.
    const rentalId = randomUUID().toString();
    const rental = new Rental(rentalId, userId, carId, rentalType, startDate.toISOString());
    this.rentalRepository.createRental(rental);
    // 5. Devuelve un objeto de tipo Rental que contiene el id del alquiler. 
    return rental;
  }
}
