import Rover from "src/domain/Rover";
import { RoverState } from "./RoverState";
import { InvalidInstructionError } from "../../src/domain/Exceptions/InvalidInstructionError";

export default function executeRoverInstructions(rover: Rover, instructions: string[]): RoverState {
  const commands = {
    M: () => rover.moveForward(),
    D: () => rover.turnRight(),
    I: () => rover.turnLeft(),
  };
  for (const inst of instructions) {
    const command = commands[inst];
    if (command) {
      command();
    } else {
      throw new InvalidInstructionError(inst);
    }
  }

  const finalState: RoverState = {
    x: rover.getPositionX(),
    y: rover.getPositionY(),
    direction: rover.getDirection(),
  };
  return finalState;
}

