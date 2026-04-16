import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from '../application/users.service';
import InMemoryUsers from './InMemoryUsers';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: InMemoryUsers
    }
  ]
})
export class UsersModule {}
