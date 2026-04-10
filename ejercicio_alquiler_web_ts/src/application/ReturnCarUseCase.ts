import RentalRepository from "../application/RentalRepository";
import Rental from "../domain/Rental";
import { RentalType } from "../domain/enums/RentalType";
import { RentalPricing } from "../domain/constants/RentalPricing";
import { CarRepository } from "./ports/CarRepository";
import { UserRepository } from "./ports/UserRepository";

export default class ReturnCarUseCase {

  private readonly rentalRepository: RentalRepository;
  private readonly carsRepository: CarRepository;

  constructor(rentalRepository: RentalRepository, carRepository: CarRepository) {
    this.rentalRepository = rentalRepository;
    this.carsRepository = carRepository;
  }

  public async execute(rentalId: string, returnDate: Date): Promise<Rental> {
    const rental = this.rentalRepository.getRentalById(rentalId);

    if (!rental) {
      throw new Error("Alquiler no encontrado");
    }
    if (rental.getEndDate()) {
      throw new Error("Alquiler ya ha sido devuelto");
    }

    const carId = rental.getCarId();
    const rentalTime = rental.getRentalTime();
    const rentalType = rental.getRentalType();

    let totalAmount = 0;
    let agencyProfit = 0;

    if (rentalType === RentalType.HOURLY) {
      totalAmount = rentalTime * RentalPricing.HOURLY_RATE;
      agencyProfit = totalAmount * RentalPricing.AGENCY_PERCENTAGE;
    } else if (rentalType === RentalType.DAILY) {
      totalAmount = rentalTime * RentalPricing.DAILY_RATE;
      agencyProfit = totalAmount * RentalPricing.AGENCY_PERCENTAGE;
    }

    rental.setEndDate(returnDate.toISOString());
    rental.setTotalAmount(totalAmount);
    rental.setAgencyProfit(agencyProfit);

    this.carsRepository.updateAvailability(carId, true);
    this.rentalRepository.updateRental(rental);
    return rental;
  }
}
