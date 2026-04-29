import { Module } from '@nestjs/common';
import { SecurityJwtModule } from '@solidarianid/security/nestjs';

@Module({
  imports: [SecurityJwtModule.register()],
  exports: [SecurityJwtModule],
})
export class AuthModule {}
