export class InvalidInstructionError extends Error {
  constructor(instruction: string) {
    super(`Instrucción inválida: ${instruction}`);
    this.name = 'InvalidInstructionError';
  }
}
