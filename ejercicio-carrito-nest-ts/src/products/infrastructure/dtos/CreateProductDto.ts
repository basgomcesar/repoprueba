import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  sku!: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  stock!: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price!: number;
}