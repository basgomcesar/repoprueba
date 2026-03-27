import { RoverOutputPort } from "../application/RoverOutputPort";

export class ConsoleAdapter implements RoverOutputPort {
  print(message: string): void {
    console.log(message);
  }
}
