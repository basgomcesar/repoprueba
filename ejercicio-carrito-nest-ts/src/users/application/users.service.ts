import { Injectable,Inject, ConflictException } from '@nestjs/common';
import type UserRepository from './UserRepository';
import User from '../domain/User';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    getAllUsers() {
        throw new Error('Method not implemented.');
    }
    constructor(@Inject('UsersRepository') private readonly usersRepository: UserRepository) {}

    create(user: { name: string; email: string, phone: string } ) {
        if (!user.name || !user.email || !user.phone) {
            throw new Error('Faltan campos obligatorios');
        }
        const existingUser = this.usersRepository.findUserByPhone(user.phone);
        if (existingUser) {
            throw new ConflictException('El número de teléfono ya está registrado');
        }
        const existingEmailUser = this.usersRepository.findUserByEmail(user.email);
        if (existingEmailUser){
            throw new ConflictException('El email ya está registrado');
        }
        const newUser = new User(uuidv4(), user.name, user.email, user.phone);

        return this.usersRepository.saveUser(newUser);
    }

    
}
