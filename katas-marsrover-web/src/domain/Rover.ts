import Grid from "./Grid";
import { Direction } from "./Direction";  

const DIRECTIONS = {
  [Direction.NORTH]: { dx: 0, dy: 1, right: Direction.EAST, left: Direction.WEST },
  [Direction.SOUTH]: { dx: 0, dy: -1, right: Direction.WEST, left: Direction.EAST },
  [Direction.EAST]: { dx: 1, dy: 0, right: Direction.SOUTH, left: Direction.NORTH },
  [Direction.WEST]: { dx: -1, dy: 0, right: Direction.NORTH, left: Direction.SOUTH },
};

export default class Rover {
  private positionX: number;
  private positionY: number;
  private direction: Direction;
  private grid: Grid;

  constructor(grid: Grid) {
    this.positionX = 0;
    this.positionY = 0;
    this.direction = Direction.NORTH;
    this.grid = grid;
  }

  public getPositionX(): number {
    return this.positionX;
  }

  public getPositionY(): number {
    return this.positionY;
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public moveForward(): void {
    const { dx, dy } = DIRECTIONS[this.direction];
    const newX = this.positionX + dx;
    const newY = this.positionY + dy;
    const bounced = this.grid.bounce({ x: newX, y: newY }, this.direction);
    this.positionX = bounced.x;
    this.positionY = bounced.y;
    this.direction = bounced.direction;
    
  }
  public turnRight(): void {
    this.direction = DIRECTIONS[this.direction].right;
  }

  public turnLeft(): void {
    this.direction = DIRECTIONS[this.direction].left;
  }
}
