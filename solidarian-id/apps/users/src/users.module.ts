import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/presentation/controllers/users.controller';
import { UsersService } from './application/services/users.service';
import { UserServicePort } from './domain/ports/in/users.service.port';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    // Service con token de puerto (para inyectar en controller)
    {
      provide: UserServicePort,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
