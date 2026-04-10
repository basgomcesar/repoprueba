import { z } from "zod";
import { RentalType } from "../../../../src/domain/enums/RentalType";
export const StartRentalRequestSchema = z.object({
  userId: z.string().min(1, { message: "ID del usuario es requerido" }),
  carId: z.string().min(1, { message: "ID del coche es requerido" }),
  rentalType: z.enum([RentalType.DAILY, RentalType.HOURLY], {
    message: "Tipo de alquiler no válido",
  }),
  rentalTime: z.coerce.number().int().positive({ message: "Tiempo de alquiler debe ser un número entero positivo" }),
  startDate: z.string().refine((s) => !Number.isNaN(new Date(s).getTime()), {
    message: "Fecha de inicio no válida",
  }).transform((s) => new Date(s)),
});

export type StartRentalRequestDto = z.infer<typeof StartRentalRequestSchema>;
