import { z } from "zod";

export const ReturnCarParamsSchema = z.object({
  rentalId: z.string().min(1),
});

export const ReturnCarBodySchema = z.object({
  returnDate: z.coerce.date(),
});

export type ReturnCarParamsDto = z.infer<typeof ReturnCarParamsSchema>;
export type ReturnCarBodyDto = z.infer<typeof ReturnCarBodySchema>;
