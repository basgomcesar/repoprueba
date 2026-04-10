import Car from "../domain/Car";
import { CarRepository } from "../application/ports/CarRepository";
import { CarStatus } from "../domain/enums/CarStatus";

export default class InMemoryCarRepository implements CarRepository {
  static cars: Car[] = [];
  exists(carId: string): boolean {
    return InMemoryCarRepository.cars.some(car => car.getCarId() === carId);
  }
  isAvailable(carId: string): boolean {
    const car = InMemoryCarRepository.cars.find(car => car.getCarId() === carId);
    return car ? car.getStatus() === CarStatus.AVAILABLE : false;
  }
  updateAvailability(carId: string, isAvailable: boolean): void {
    const car = InMemoryCarRepository.cars.find(car => car.getCarId() === carId);
    if (car) {
      car.setStatus(isAvailable ? CarStatus.AVAILABLE : CarStatus.UNAVAILABLE);
    }
  }
  findById(carId: string): Car | null {
    return InMemoryCarRepository.cars.find(car => car.getCarId() === carId) || null;
  }

}
