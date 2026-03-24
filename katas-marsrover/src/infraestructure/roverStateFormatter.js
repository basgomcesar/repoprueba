const Direction = require('../domain/direction');

function toInitial(direction) {
  switch (direction) {
    case Direction.NORTH:
      return 'N';
    case Direction.SOUTH:
      return 'S';
    case Direction.EAST:
      return 'E';
    case Direction.WEST:
      return 'O';
    default:
      throw new Error(`Unknown direction: ${direction}`);
  }
}

function formatRoverState(state) {
  if (!state || typeof state.x !== 'number' || typeof state.y !== 'number' || !state.direction) {
    throw new Error('Invalid rover state');
  }

  return `${state.x}:${state.y}:${toInitial(state.direction)}`;
}

module.exports = formatRoverState;
