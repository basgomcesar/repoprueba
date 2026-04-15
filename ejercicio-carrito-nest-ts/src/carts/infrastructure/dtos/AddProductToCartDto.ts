import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class AddProductToCartDto {
    @IsString()
    @IsNotEmpty()
    sku!: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantity!: number;
}