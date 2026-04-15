import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateProductStockDto {
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  stock!: number;
}