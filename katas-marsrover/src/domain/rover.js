const DIRECTIONS = require('./directions');

class Rover {
  constructor(grid) {
    this.positionX = 0;
    this.positionY = 0;
    this.direction = 'N';
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
