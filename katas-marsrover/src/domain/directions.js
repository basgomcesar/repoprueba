const DIRECTIONS = {
  N: { dx: 0, dy: 1, right: 'E', left: 'W' },
  S: { dx: 0, dy: -1, right: 'W', left: 'E' },
  E: { dx: 1, dy: 0, right: 'S', left: 'N' },
  W: { dx: -1, dy: 0, right: 'N', left: 'S' }
};

module.exports = DIRECTIONS;
