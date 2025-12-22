import { Module } from '@nestjs/common';
import { AuthService } from './model/services/auth.service.impl';
import { AuthViewController } from './controllers/auth-view.controller';
import { AuthApiController } from './controllers/auth-api.controller';

@Module({
  controllers: [AuthViewController, AuthApiController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
