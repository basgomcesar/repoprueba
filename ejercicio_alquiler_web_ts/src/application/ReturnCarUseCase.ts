import RentalRepository from "../application/RentalRepository";

export class ReturnCarUseCase {

  private rentalRepository: RentalRepository;

  constructor( rentalRepository: RentalRepository) {
    this.rentalRepository = rentalRepository;
  }
  
}
