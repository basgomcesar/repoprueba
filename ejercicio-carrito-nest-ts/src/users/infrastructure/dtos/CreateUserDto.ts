import { IsString, IsEmail, MinLength } from 'class-validator';
export default class CreateUserDto {
    @IsString()
    @MinLength(3)
    name!: string;

    @IsEmail()
    email!: string;
    
    @IsString()
    @MinLength(10)
    phone!: string;
}