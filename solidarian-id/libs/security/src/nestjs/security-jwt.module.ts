import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({})
export class SecurityJwtModule {
  static register(): DynamicModule {
    return {
      module: SecurityJwtModule,
      imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [JwtStrategy, JwtAuthGuard],
      exports: [PassportModule, JwtStrategy, JwtAuthGuard],
    };
  }
}
