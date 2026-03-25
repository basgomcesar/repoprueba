const Direction = require('./direction');
class Grid {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.maxIndex = gridSize - 1;
  }

  bounce({ positionX, positionY }, direction) {
    if (positionX < 0)
      return {
        x: 1, y: positionY, direction: Direction.EAST
      };
    
    if (positionX > this.maxIndex)
      return {
        x: this.maxIndex - 1, y: positionY, direction: Direction.WEST
      };

    if (positionY < 0)
      return {
        x: positionX, y: 1, direction: Direction.NORTH
      };
      
    if (positionY > this.maxIndex)
      return {
        x: positionX, y: this.maxIndex - 1, direction: Direction.SOUTH
      };

    return { x: positionX, y: positionY, direction };
  }
}

module.exports = Grid;
