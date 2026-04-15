import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
