const Rover = require('../domain/rover');
const Grid = require('../domain/grid');
const executeRoverInstructions = require('../application/executeRoverInstructions');
const formatRoverState = require('./roverStateFormatter');

function runCli(argv = process.argv, deps = {}) {
  const {
    execute = executeRoverInstructions,
    presenter = formatRoverState,
    output = console,
    createRover = () => new Rover(new Grid(10)),
  } = deps;

  const instructions = parseInstructions(argv);
  const rover = createRover();

  // Ejecutar las instrucciones y obtener el estado final del rover
  const finalState = execute(rover, instructions); 

  const text = presenter(finalState);
  output.log(text);
  return text;
}

function parseInstructions(argv) {
  const raw = argv[2] ?? '';
  return raw.split('').filter(Boolean);
}
// Permite ejecutar el CLI directamente con `node src/infraestructure/cli.js 
if (require.main === module) runCli(process.argv);

module.exports = runCli;
