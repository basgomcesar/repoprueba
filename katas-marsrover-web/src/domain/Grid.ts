import { Direction } from "./Direction";
import TerrainPort from "../application/TerrainPort";

export default class Grid implements TerrainPort {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  bounce(position: { x: number; y: number; }, direction: Direction): { x: number; y: number; direction: Direction; }{
    if (position.x < 0)
      return {
        x: 1, y: position.y, direction: Direction.EAST
      };

    if (position.x > this.width - 1)
      return {
        x: this.width - 1, y: position.y, direction: Direction.WEST
      };

    if (position.y < 0)
      return {
        x: position.x, y: 1, direction: Direction.NORTH
      };

    if (position.y > this.height - 1)
      return {
        x: position.x, y: this.height - 1, direction: Direction.SOUTH
      };

    return { x: position.x, y: position.y, direction };
  }

}
