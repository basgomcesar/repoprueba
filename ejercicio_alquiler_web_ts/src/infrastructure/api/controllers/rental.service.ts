import Rental from "../../../../src/domain/Rental";
import { StartRentalUseCase } from "../../../../src/application/StartRentalUseCase";

export default class RentalService {

  private readonly startRentalUseCase: StartRentalUseCase;

  constructor(startRentalUseCase: StartRentalUseCase) {
    this.startRentalUseCase = startRentalUseCase;
  }

  startRental(userId: string, carId: string, rentalType: string, startDate: Date): Rental {
    return this.startRentalUseCase.execute(userId, carId, rentalType, startDate);
  }


}
