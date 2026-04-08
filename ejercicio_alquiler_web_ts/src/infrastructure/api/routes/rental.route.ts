import Route from "express";
import RentalService from "../controllers/rental.service";
import Rental from "../../../../src/domain/Rental";

export default function createRentalRoutes(rentalService: RentalService): Route {
  const router = Route();

  router.post("/rentals", rentalService.startRental.bind(rentalService));

  return router;
}
