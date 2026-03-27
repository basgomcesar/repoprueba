import createSystem from './System';

export default function runCli(argv = process.argv) {
  const { createRover, execute, presenter, output } = createSystem();

  const raw = argv[2] ?? '';
  const instructions = raw.split('').filter(Boolean);

  const rover = createRover();

  try {
    const result = execute(rover, instructions);
    const formatted = presenter(result);

    output.print(formatted);

    return formatted;

  } catch (error: any) {
    output.print(error.message);
    return error.message;
  }
}

if (require.main === module) {
  runCli(process.argv);
}
