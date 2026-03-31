import Rover from "src/domain/Rover";
import { RoverState } from "./RoverState";

export interface RoverSystem {
  execute: (rover: Rover, instructions: string[]) => RoverState;
  createRover: () => Rover;
  presenter: (state: RoverState) => string;
}
