export interface RentalResponseDto {
   rentalId: string;
   userId: string;
   carId: string;
   rentalTime: number;
   rentalType: string;
   startDate: string;
   endDate?: string;
   totalAmount?: number;
   agencyProfit?: number;
}
