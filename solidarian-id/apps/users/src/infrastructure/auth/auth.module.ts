import { UsersModule } from '@app/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        privateKey: Buffer.from(config.get<string>('JWT_PRIVATE_KEY_BASE64') ?? '', 'base64').toString('utf8'),
        publicKey: Buffer.from(config.get<string>('JWT_PUBLIC_KEY_BASE64') ?? '', 'base64').toString('utf8'),
        signOptions: { algorithm: 'RS256' },
      }),
    }),
  ],
  providers: [],
  controllers: [],
})
export class AuthModule {}
