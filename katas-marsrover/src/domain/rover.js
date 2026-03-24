const Direction = require('./direction');

class Rover {
  constructor() {
    this.positionX = 0;
    this.positionY = 0;
    this.direction = Direction.NORTH;
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
    if (this.direction === Direction.NORTH) {
      if (this.positionY === 9) {
        this.direction = Direction.SOUTH;
        this.positionY -= 1;
      } else {
        this.positionY += 1;
      }
    } else if (this.direction === Direction.SOUTH) {
      if (this.positionY === 0) {
        this.direction = Direction.NORTH;
        this.positionY += 1;
      } else {
        this.positionY -= 1;
      }
    } else if (this.direction === Direction.EAST) {
      if (this.positionX === 9) {
        this.direction = Direction.WEST;
        this.positionX -= 1;
      } else {
        this.positionX += 1;
      }
    } else if (this.direction === Direction.WEST) {
      if (this.positionX === 0) {
        this.direction = Direction.EAST;
        this.positionX += 1;
      } else {
        this.positionX -= 1;
      }
    }
  }
  rotateRight() {
    if (this.direction === Direction.NORTH) {
      this.direction = Direction.EAST;
    } else if (this.direction === Direction.EAST) {
      this.direction = Direction.SOUTH;
    } else if (this.direction === Direction.SOUTH) {
      this.direction = Direction.WEST;
    } else if (this.direction === Direction.WEST) {
      this.direction = Direction.NORTH;
    }
  }
  rotateLeft() {
    if (this.direction === Direction.NORTH) {
      this.direction = Direction.WEST;
    } else if (this.direction === Direction.WEST) {
      this.direction = Direction.SOUTH;
    } else if (this.direction === Direction.SOUTH) {
      this.direction = Direction.EAST;
    } else if (this.direction === Direction.EAST) {
      this.direction = Direction.NORTH;
    }
  }
}

module.exports = Rover;
