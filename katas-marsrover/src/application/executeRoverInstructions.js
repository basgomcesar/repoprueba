const Direction = require('../domain/direction');

function toShortDirection(direction) {
  switch (direction) {
    case Direction.NORTH: return 'N';
    case Direction.SOUTH: return 'S';
    case Direction.EAST: return 'E';
    case Direction.WEST: return 'W';
    default: throw new Error(`Unknown direction: ${direction}`);
  }
}

function executeRoverInstructions(rover, instructions) {
  instructions.forEach((instruction) => {
    if (instruction === 'M') rover.moveForward();
    else if (instruction === 'D') rover.rotateRight();
    else if (instruction === 'I') rover.rotateLeft();
    else throw new Error(`Unknown instruction: ${instruction}`);
  });

  return {
    x: rover.getPositionX(),
    y: rover.getPositionY(),
    direction: toShortDirection(rover.getDirection()),
  };
}

module.exports = executeRoverInstructions;
