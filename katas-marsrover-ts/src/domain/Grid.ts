import { Direction } from "./Direction";

export default class Grid{
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
  bounce({ positionX, positionY }, direction) {
    if (positionX < 0)
      return {
        x: 1, y: positionY, direction: Direction.EAST
      };
    
    if (positionX > this.width - 1)
      return {
        x: this.width - 1, y: positionY, direction: Direction.WEST
      };

    if (positionY < 0)
      return {
        x: positionX, y: 1, direction: Direction.NORTH
      };
      
    if (positionY > this.height - 1)
      return {
        x: positionX, y: this.height - 1, direction: Direction.SOUTH
      };

    return { x: positionX, y: positionY, direction };
  }

}
