import { AuthServiceImpl } from '@app/users/application/services/auth.service.impl';
import { TokensRepositoryPort } from '@app/users/domain/ports/tokens.repository.port';
import { AuthService } from '@app/users/domain/services/auth.service';
import { RefreshTokenEntity } from '@app/users/infrastructure/persistence/entities/refresh-token.entity';
import { RefreshTokenMapper } from '@app/users/infrastructure/persistence/mappers/refresh-token.mapper';
import { TokensTypeormRepository } from '@app/users/infrastructure/persistence/repositories/tokens-typeorm.repository';
import { AuthController } from '@app/users/infrastructure/presentation/controllers/auth.controller';
import { JwtAuthGuard } from '@app/users/infrastructure/auth/guards/jwt-auth.guard';
import { JwtStrategy } from '@app/users/infrastructure/auth/strategies/jwt.strategy';
import { AuthorizationGuard } from '@app/users/infrastructure/authz/guards/authorization.guard';
import { AUTHZ_POLICY_EVALUATORS, PolicyRegistry } from '@app/users/infrastructure/authz/policies/policy-registry';
import { SelfOwnershipPolicy } from '@app/users/infrastructure/authz/policies/self-ownership.policy';
import { UsersModule } from '@app/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateKeyPairSync } from 'node:crypto';

function resolveJwtKeys(config: ConfigService): { privateKey: string; publicKey: string } {
  const privateKey = Buffer.from(config.get<string>('JWT_PRIVATE_KEY_BASE64') ?? '', 'base64').toString('utf8');
  const publicKey = Buffer.from(config.get<string>('JWT_PUBLIC_KEY_BASE64') ?? '', 'base64').toString('utf8');

  if (privateKey && publicKey) {
    return { privateKey, publicKey };
  }

  if (process.env.NODE_ENV === 'test') {
    const generated = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });

    return {
      privateKey: generated.privateKey,
      publicKey: generated.publicKey,
    };
  }

  return { privateKey: '', publicKey: '' };
}

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const keys = resolveJwtKeys(config);

        return {
          privateKey: keys.privateKey,
          publicKey: keys.publicKey,
          signOptions: { algorithm: 'RS256' },
        };
      },
    }),
  ],
  providers: [
    RefreshTokenMapper,
    JwtStrategy,
    JwtAuthGuard,
    AuthorizationGuard,
    PolicyRegistry,
    SelfOwnershipPolicy,
    {
      provide: AUTHZ_POLICY_EVALUATORS,
      useFactory: (selfOwnershipPolicy: SelfOwnershipPolicy) => [selfOwnershipPolicy],
      inject: [SelfOwnershipPolicy],
    },
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: TokensRepositoryPort,
      useClass: TokensTypeormRepository,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, AuthorizationGuard],
})
export class AuthModule {}
