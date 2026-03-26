import Rover from '../domain/Rover';
import Grid from '../domain/Grid';
import executeRoverInstructions from '../application/ExecuteRoverInstructions';
import cliPresenter from './RoverStateFormatter';
import { ConsoleAdapter } from './ConsoleAdapter';

export default function createSystem() {
  const output = new ConsoleAdapter();

  return {
    createRover: () => new Rover(new Grid(10, 10)),
    execute: executeRoverInstructions,
    presenter: cliPresenter,
    output,
  };
}
