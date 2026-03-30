import Rover from '../../domain/Rover';
import Grid from '../../domain/Grid';
import executeRoverInstructions from '../../application/ExecuteRoverInstructions';
import presenter from './RoverStateFormatter';

export default function createSystem() {

  return {
    createRover: () => new Rover(new Grid(10, 10)),
    execute: executeRoverInstructions,
    presenter,
  };
}
