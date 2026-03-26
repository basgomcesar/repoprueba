export default function formatRoverState(state) {
  if (!state || typeof state.x !== 'number' || typeof state.y !== 'number' || !state.direction) {
    throw new Error('Estado del rover inválido');
  }

  return `${state.x}:${state.y}:${state.direction}`;
}
