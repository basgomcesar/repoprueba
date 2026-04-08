import RentalRepository from "src/application/RentalRepository";
import Car from "../../src/domain/Car";
import Rental from "../../src/domain/Rental";
import User from "../../src/domain/User";

export default class InMemoryRentalRepository implements RentalRepository {

  static rentals: Rental[] = [];
  static cars: Car[] = [];
  static users: User[] = [];

  createRental(rental: Rental): Rental {
    InMemoryRentalRepository.rentals.push(rental);
    return rental;
  }

  isUserExists(userId: string): boolean {
    return InMemoryRentalRepository.users.some(user => user.getUserId() === userId);
  }

  isCarAvailable(carId: string): boolean {
    return InMemoryRentalRepository.cars.some(car => car.getCarId() === carId && car.getStatus() === "available");
  }

  isCarExists(carId: string): boolean {
    const car = InMemoryRentalRepository.cars.find(car => car.getCarId() === carId);
    return !!car;
  }

  updateCarAvailability(carId: string, isAvailable: boolean): void {
    const car = InMemoryRentalRepository.cars.find(c => c.getCarId() === carId);
    if (car) {
      car.setStatus(isAvailable ? "available" : "unavailable");
    }
  }

}
