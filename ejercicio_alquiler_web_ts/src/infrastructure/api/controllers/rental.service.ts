import Rental from "../../../../src/domain/Rental";
import { StartRentalUseCase } from "../../../../src/application/StartRentalUseCase";
import { Request, Response } from "express";
import ReturnCarUseCase from "src/application/ReturnCarUseCase";
import { RentalResponseDto } from "../dtos/RentalResponseDto";
import rentalToResponseDto from "../mappers/rentalToResponseDto";
import { StartRentalRequestDto } from "../dtos/StartRentalRequestSchema";

export default class RentalService {

  private readonly startRentalUseCase: StartRentalUseCase;
  private readonly returnCarUseCase: ReturnCarUseCase;

  constructor(startRentalUseCase: StartRentalUseCase, returnCarUseCase: ReturnCarUseCase) {
    this.startRentalUseCase = startRentalUseCase;
    this.returnCarUseCase = returnCarUseCase;
  }

  startRental(req: Request, res: Response) {
    const { userId, carId, rentalType, rentalTime, startDate } = req.body;

    try {
      const startDateObj = new Date(startDate); 
      const rentalTimeNum = parseInt(rentalTime, 10);

      const rental = this.startRentalUseCase.execute(userId, carId, rentalType, rentalTimeNum, startDateObj);
      const rentalResponse = rentalToResponseDto(rental);
      res.status(201).json(rentalResponse);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


  async returnCar(req: Request, res: Response) {
    const { rentalId } = req.params;
    const { returnDate } = req.body;

    try {
      const returnDateObj = new Date(returnDate);
      const rental =await this.returnCarUseCase.execute(rentalId, returnDateObj);
      res.status(200).json(rentalToResponseDto(rental));
      return rental;
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

}
