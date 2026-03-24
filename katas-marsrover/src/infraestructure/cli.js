const Rover = require('../domain/rover');
const executeRoverInstructions = require('../application/executeRoverInstructions');
const formatRoverState = require('../infraestructure/roverStateFormatter');

function runCli(argv = process.argv, deps = {}) {
  const {
    createRover = () => new Rover(),
    execute = executeRoverInstructions,
    presenter = formatRoverState,
    output = console,
  } = deps;

  const raw = argv[2] ?? '';
  const instructions = raw.split('').filter(Boolean);

  const rover = createRover();
  const finalState = execute(rover, instructions);
  const text = presenter(finalState);

  output.log(text);

  return text; 
}

if (require.main === module) {
  runCli(process.argv);
}

module.exports = runCli;
