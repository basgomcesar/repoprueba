import Rental from "src/domain/Rental";
import { RentalResponseDto } from "../dtos/RentalResponseDto";

export default function rentalToResponseDto(rental: Rental): RentalResponseDto {
  return {
    rentalId: rental.getRentalId(),
    userId: rental.getUserId(),
    carId: rental.getCarId(),
    rentalTime: rental.getRentalTime(),
    rentalType: rental.getRentalType(),
    startDate: rental.getStartDate(),
    endDate: rental.getEndDate(),
    totalAmount: rental.getTotalAmount(),
    agencyProfit: rental.getAgencyProfit()
  };
}
