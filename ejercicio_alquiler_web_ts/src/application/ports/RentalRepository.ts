import Rental from "../../domain/Rental";

export default interface RentalRepository {
  getRentalById(rentalId: string): Rental | null;
  updateRental(rental: Rental): void;
  createRental(rental: Rental): Rental;
}
