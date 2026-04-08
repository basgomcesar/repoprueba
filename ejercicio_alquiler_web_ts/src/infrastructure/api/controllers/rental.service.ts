import Rental from "../../../../src/domain/Rental";
import { StartRentalUseCase } from "../../../../src/application/StartRentalUseCase";
import { Request, Response } from "express";
import ReturnCarUseCase from "src/application/ReturnCarUseCase";

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


  async returnCar(req: Request, res: Response) {
    const { rentalId } = req.params;
    const { returnDate } = req.body;

    try {
      const returnDateObj = new Date(returnDate);
      if (isNaN(returnDateObj.getTime())) {
        throw new Error("Fecha de devolución no válida");
      }

      const rental =await this.returnCarUseCase.execute(rentalId, returnDateObj);
      res.status(200).json({
        rentalId: rental.getRentalId(),
        userId: rental.getUserId(),
        carId: rental.getCarId(),
        rentalType: rental.getRentalType(),
        rentalTime: rental.getRentalTime(),
        startDate: rental.getStartDate(),
        endDate: rental.getEndDate(),
        totalAmount: rental.getTotalAmount(),
        agencyProfit: rental.getAgencyProfit()
      });
      return rental;
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

}
