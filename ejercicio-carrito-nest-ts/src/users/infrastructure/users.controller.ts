import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import CreateUserDto from './dtos/CreateUserDto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.getAllUsers();
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @Get('/:phone')
    findByPhone(@Param('phone') phone: string) {
        if (!/^\d{10}$/.test(phone)) {
            throw new BadRequestException('Número de teléfono no válido');
        }
        return this.usersService.getUserByPhone(phone);
    }
}
