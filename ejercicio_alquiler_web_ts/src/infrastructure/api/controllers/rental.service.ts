import Rental from "../../../../src/domain/Rental";
import { StartRentalUseCase } from "../../../../src/application/StartRentalUseCase";
import { Request, Response } from "express";

export default class RentalService {

  private readonly startRentalUseCase: StartRentalUseCase;

  constructor(startRentalUseCase: StartRentalUseCase) {
    this.startRentalUseCase = startRentalUseCase;
  }

  startRental(req: Request, res: Response) {
    const { userId, carId, rentalType, rentalTime, startDate } = req.body;

    try {
      const startDateObj = new Date(startDate); 
      const rentalTimeNum = parseInt(rentalTime, 10);
      if (isNaN(startDateObj.getTime())) {
        throw new Error("Fecha de inicio no válida");
      }
      if (isNaN(rentalTimeNum)) {
        throw new Error("Tiempo de alquiler no válido");
      }

      const rental = this.startRentalUseCase.execute(userId, carId, rentalType, rentalTimeNum, startDateObj);
      res.status(201).json(rental);
      return rental;
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

}
