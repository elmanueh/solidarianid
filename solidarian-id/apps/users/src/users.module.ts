import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/presentation/controllers/users.controller';
import { UsersService } from './application/services/users.service';
import { UserServicePort } from './domain/ports/in/users.service.port';
import { PasswordHasherPort } from '@app/utils/password-hasher/password-hasher.port';
import { PasswordHasher } from '@app/utils/password-hasher/password-hasher';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: UserServicePort,
      useClass: UsersService,
    },
    {
      provide: PasswordHasherPort,
      useClass: PasswordHasher,
    },
  ],
})
export class UsersModule {}
