import Rover from "src/domain/Rover";

export default class ExecuteRoverInstructions {
  constructor(private rover: Rover, private instructions: string[]) {}

  public execute(): void {
    for (const instruction of this.instructions) {
      if (instruction === "R") {
        this.rover.turnRight();
      } else if (instruction === "M") {
        this.rover.moveForward();
      }
    }
  }
}

