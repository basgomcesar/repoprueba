
function toInitial(direction) {
  switch (direction) {
    case 'N':
      return 'N';
    case 'S':
      return 'S';
    case 'E':
      return 'E';
    case 'W':
      return 'O';
    default:
      throw new Error(`Unknown direction: ${direction}`);
  }
}

// Formatea el estado del rover en "x:y:direction" (e.g., "0:0:N")
function formatRoverState(state) {
  if (!state || typeof state.x !== 'number' || typeof state.y !== 'number' || !state.direction) {
    throw new Error('Invalid rover state');
  }

  return `${state.x}:${state.y}:${toInitial(state.direction)}`;
}

module.exports = formatRoverState;
