export class ProductoYaExisteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProductoYaExisteError";
  }
}
