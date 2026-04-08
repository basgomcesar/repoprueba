import RentalRepository from "../application/RentalRepository";
import Rental from "../domain/Rental";

export default class ReturnCarUseCase {

  private rentalRepository: RentalRepository;

  constructor(rentalRepository: RentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  public async execute(rentalId: string, returnDate: Date): Promise<Rental> {
    const rental = await  this.rentalRepository.getRentalById(rentalId);

    if (!rental) {
      throw new Error("Alquiler no encontrado");
    }

    const carId = rental.getCarId();
    const rentalTime = rental.getRentalTime();
    const rentalType = rental.getRentalType();

    let totalAmount = 0;
    let agencyProfit = 0;

    if (rentalType === "hourly") {
      totalAmount = rentalTime * 5; 
      agencyProfit = totalAmount * 0.25; 
    } else if (rentalType === "daily") {
      totalAmount = rentalTime * 20;
      agencyProfit = totalAmount * 0.25; 
    }

    rental.setEndDate(returnDate.toISOString());
    rental.setTotalAmount(totalAmount);
    rental.setAgencyProfit(agencyProfit);

    this.rentalRepository.updateCarAvailability(carId, true);
    this.rentalRepository.updateRental(rental);
    return rental;
  }
}
