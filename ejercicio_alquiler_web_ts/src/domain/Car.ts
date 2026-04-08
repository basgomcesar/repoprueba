export default class Car {

  private carId: string;
  private model: string;
  private status: string;

  constructor(carId: string, model: string, status: string) {
    this.carId = carId;
    this.model = model;
    this.status = status;
  }

  getCarId(): string {
    return this.carId;
  }

  setCarId(carId: string): void {
    this.carId = carId;
  }

  getModel(): string {
    return this.model;
  }

  setModel(model: string): void {
    this.model = model;
  }

  getStatus(): string {
    return this.status;
  }

  setStatus(status: string): void {
    this.status = status;
  }

}
