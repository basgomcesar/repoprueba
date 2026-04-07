import { Direction } from "../domain/Direction";

export type RoverState = Readonly<{
  x: number;
  y: number;
  direction: Direction;
}>;
