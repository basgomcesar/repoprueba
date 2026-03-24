class Grid {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.maxIndex = gridSize - 1;
  }

  bounce({ positionX, positionY }, direction) {
    if (positionX < 0) return { x: 1, y: positionY, direction: 'E' };
    if (positionX > this.maxIndex)
      return {
        x: this.maxIndex - 1, y: positionY, direction: 'W'
      };

    if (positionY < 0)
      return {
        x: positionX, y: 1, direction: 'N'
      };
    if (positionY > this.maxIndex)
      return {
        x: positionX, y: this.maxIndex - 1, direction: 'S'
      };

    return { x: positionX, y: positionY, direction };
  }
}

module.exports = Grid;
