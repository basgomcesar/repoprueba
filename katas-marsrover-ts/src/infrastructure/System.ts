
import Rover from '../domain/Rover';
import Grid from '../domain/Grid';
import executeRoverInstructions from '../application/ExecuteRoverInstructions';
import cliPresenter from './cliPresenter';

export default function createSystem() {
  return {
    createRover: () => new Rover(new Grid(10, 10)),
    execute: executeRoverInstructions,
    presenter: cliPresenter,
  };
}
