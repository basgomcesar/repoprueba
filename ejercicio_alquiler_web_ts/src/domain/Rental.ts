export default class Rental {
  private rentalId: string;
  private userId: string;
  private carId: string;
  private rentalType: string;
  private startDate: string;
  private endDate?: string;
  private totalAmount?: number;
  private agencyProfit?: number;

  constructor(rentalId: string, userId: string, carId: string, rentalType: string, startDate: string) {
    this.rentalId = rentalId;
    this.userId = userId;
    this.carId = carId;
    this.rentalType = rentalType;
    this.startDate = startDate;
  }

  public getRentalId(): string {
    return this.rentalId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getCarId(): string {
    return this.carId;
  }

  public getRentalType(): string {
    return this.rentalType;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getEndDate(): string | undefined {
    return this.endDate;
  }

  public getTotalAmount(): number | undefined {
    return this.totalAmount;
  }

  public getAgencyProfit(): number | undefined {
    return this.agencyProfit;
  } 

}
