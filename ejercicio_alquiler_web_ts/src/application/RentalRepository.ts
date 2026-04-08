import Rental from "../domain/Rental";

export default interface RentalRepository {
  getRentalById(rentalId: string): Rental | null;
  updateRental(rental: Rental): void;
  updateCarAvailability(carId: string, isAvailable: boolean): void;
  isUserExists(userId: string): boolean;
  isCarAvailable(carId: string): boolean;
  isCarExists(carId: string): boolean;
  createRental(rental: Rental): Rental;
}
