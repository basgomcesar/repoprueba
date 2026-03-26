import Rover from "src/domain/Rover";

export default function executeRoverInstructions(rover: Rover, instructions: string[]) {
  const commands = {
    M: () => rover.moveForward(),
    D: () => rover.turnRight(),
    I: () => rover.turnLeft(),
  };
  for (const inst of instructions) {
    const command = commands[inst];
    if (command) {
      command();
    } else {
      throw new Error(`Instrucción inválida: ${inst}`);
    }
  }

  return {
    x: rover.getPositionX(),
    y: rover.getPositionY(),
    direction: rover.getDirection(),
  };
}

