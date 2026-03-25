const createSystem = require('./system');

function runCli(argv = process.argv) {
  const { createRover, execute, presenter } = createSystem();

  const raw = argv[2] ?? '';
  const instructions = raw.split('').filter(Boolean);

  const rover = createRover();
  const result = execute(rover, instructions);

  const output = presenter(result);

  console.log(output);

  return output;
}

if (require.main === module) {
  runCli(process.argv);
}

module.exports = runCli;
