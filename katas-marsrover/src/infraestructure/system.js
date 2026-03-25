const Rover = require('../domain/rover');
const Grid = require('../domain/grid');
const executeRoverInstructions = require('../application/executeRoverInstructions');
const cliPresenter = require('./cliPresenter');

function createSystem() {
  return {
    createRover: () => new Rover(new Grid(10)),
    execute: executeRoverInstructions,
    presenter: cliPresenter,
  };
}

module.exports = createSystem;
