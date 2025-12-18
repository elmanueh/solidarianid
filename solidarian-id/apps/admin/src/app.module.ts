import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './administrador/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
