import RentalRepository from "src/application/RentalRepository";
import Car from "../../src/domain/Car";
import Rental from "../../src/domain/Rental";
import User from "../../src/domain/User";
import { CarStatus } from "../../src/domain/enums/CarStatus";

export default class InMemoryRentalRepository implements RentalRepository {

  static rentals: Rental[] = [];

  getRentalById(rentalId: string): Rental | null {
    const rental = InMemoryRentalRepository.rentals.find(r => r.getRentalId() === rentalId);
    return rental || null;
  }
  
  updateRental(rental: Rental): void {
    const rentalIndex = InMemoryRentalRepository.rentals.findIndex(r => r.getRentalId() === rental.getRentalId());
    if (rentalIndex !== -1) {
      InMemoryRentalRepository.rentals[rentalIndex] = rental;
    }
  }

  createRental(rental: Rental): Rental {
    InMemoryRentalRepository.rentals.push(rental);
    return rental;
  }

}
