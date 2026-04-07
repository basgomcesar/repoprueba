function executeRoverInstructions(rover, instructions) {
  const commands = {
    M: () => rover.moveForward(),
    D: () => rover.rotateRight(),
    I: () => rover.rotateLeft(),
  };
  for (const inst of instructions) {
    const command = commands[inst];
    if (command) {
      command();
    } else {
      throw new Error(`Unknown instruction: ${inst}`);
    }
  }

  return {
    x: rover.getPositionX(),
    y: rover.getPositionY(),
    direction: rover.getDirection(),
  };
}
module.exports = executeRoverInstructions;
