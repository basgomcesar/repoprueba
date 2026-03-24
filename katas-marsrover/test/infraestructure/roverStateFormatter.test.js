const formatRoverState = require('../../src/infraestructure/roverStateFormatter');

describe('roverStateFormatter (adapter out)', () => {
  it('formatea NORTH como N', () => {
    const state = { x: 0, y: 2, direction: 'N' };
    expect(formatRoverState(state)).toBe('0:2:N');
  });

  it('formatea EAST como E', () => {
    const state = { x: 1, y: 0, direction: 'E' };
    expect(formatRoverState(state)).toBe('1:0:E');
  });
});
