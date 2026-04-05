import ProductRepository from "./ProductRepository";

export class CheckoutUseCase {
  constructor(private readonly cartRepository: ProductRepository) {}

  checkout(userId: string) {
      // Aquí iría la lógica para procesar el pago, generar la orden, etc.
  }

}
