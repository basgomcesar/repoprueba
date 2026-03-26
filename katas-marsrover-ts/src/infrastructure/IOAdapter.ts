import createSystem from './system';

export default function runCli(argv = process.argv) {
  const { createRover, execute, presenter } = createSystem();

  const raw = argv[2] ?? '';
  const instructions = raw.split('').filter(Boolean);

  const rover = createRover();
  let result;
  try {
     result = execute(rover, instructions);
  } catch (error) {
    console.error(error.message);
    return error.message;
  }

  const output = presenter(result);

  console.log(output);

  return output;
}

if (require.main === module) {
  runCli(process.argv);
}

