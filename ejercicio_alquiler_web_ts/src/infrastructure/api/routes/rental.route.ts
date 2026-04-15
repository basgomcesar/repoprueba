import Route from "express";
import RentalService from "../controllers/rental.service";
import Rental from "../../../../src/domain/Rental";
import { StartRentalRequestSchema } from "../dtos/StartRentalRequestSchema";
import { ReturnCarBodySchema } from "../dtos/ReturnCarParamsSchema";
import { validateBody } from "../middlewares/validate";

export default function createRentalRoutes(rentalService: RentalService): Route {
  const router = Route();

  router.post("/rentals", validateBody(StartRentalRequestSchema), rentalService.startRental.bind(rentalService));
  router.post("/rentals/return/:rentalId", validateBody(ReturnCarBodySchema), rentalService.returnCar.bind(rentalService));

  return router;
}
