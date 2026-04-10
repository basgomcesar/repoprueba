import Car from "../../domain/Car";

export interface CarRepository {
  exists(carId: string): boolean;
  isAvailable(carId: string): boolean;
  updateAvailability(carId: string, isAvailable: boolean): void;
  findById(carId: string): Car | null;
}
