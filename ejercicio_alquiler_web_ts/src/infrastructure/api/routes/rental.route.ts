import Route from "express";
import RentalService from "../controllers/rental.service";
import Rental from "../../../../src/domain/Rental";

export default function createRentalRoutes(rentalService: RentalService): Route {
  const router = Route();

  router.post("/rentals", async (req, res) => {
    try {
      const { userId, carId, rentalType, startDate } = req.body;
      const rental: Rental = await rentalService.startRental(userId, carId, rentalType, startDate);
      res.status(201).json(rental);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
