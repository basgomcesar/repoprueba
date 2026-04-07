

// Formatea el estado del rover
function formatRoverState(state) {
  if (!state || typeof state.x !== 'number' || typeof state.y !== 'number' || !state.direction) {
    throw new Error('Invalid rover state');
  }

  return `${state.x}:${state.y}:${state.direction}`;
}

module.exports = formatRoverState;
