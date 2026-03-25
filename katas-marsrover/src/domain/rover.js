const Direction = require('./direction');

const DIRECTIONS = {
  N: { dx: 0, dy: 1, right: Direction.EAST, left: Direction.WEST},
  S: { dx: 0, dy: -1, right: Direction.WEST, left: Direction.EAST },
  E: { dx: 1, dy: 0, right: Direction.SOUTH, left: Direction.NORTH },
  O: { dx: -1, dy: 0, right: Direction.NORTH, left: Direction.SOUTH },
};


class Rover {
  constructor(grid) {
    this.positionX = 0;
    this.positionY = 0;
    this.direction = Direction.NORTH;
    this.grid = grid;
  }

  getPositionX() {
    return this.positionX;
  }

  getPositionY() {
    return this.positionY;
  }
  getDirection() {
    return this.direction;
  }
  moveForward() {
    console.log(`Rover en (${this.positionX},${this.positionY}) mirando ${this.direction}`);
    const { dx, dy } = DIRECTIONS[this.direction];
    // Calcular la siguiente posición
    const next = {
      positionX: this.positionX + dx,
      positionY: this.positionY + dy
    };
    const bounced = this.grid.bounce(next, this.direction);

    this.positionX = bounced.x;
    this.positionY = bounced.y;
    this.direction = bounced.direction;
  }
  rotateRight() {
    this.direction = DIRECTIONS[this.direction].right;
  }
  rotateLeft() {
    this.direction = DIRECTIONS[this.direction].left;
  }  
}


module.exports = Rover;
