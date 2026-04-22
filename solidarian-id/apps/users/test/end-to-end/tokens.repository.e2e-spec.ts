import { RefreshToken } from '@app/users/domain/model/refresh-token';
import { TokensRepositoryPort } from '@app/users/domain/ports/tokens.repository.port';
import { AuthModule } from '@app/users/infrastructure/auth/auth.module';
import { RefreshTokenEntity } from '@app/users/infrastructure/persistence/entities/refresh-token.entity';
import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UsersModule } from '@app/users/users.module';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { KafkaTestModule, PostgreSQLSeeder, PostgreSQLTestModule, TestContainerLifecycle } from '@solidarianid/testing';
import { createHash } from 'node:crypto';
import { DataSource } from 'typeorm';

describe('TokensTypeormRepository (e2e)', () => {
  let app: INestApplication;
  let seeder: PostgreSQLSeeder;
  let repository: TokensRepositoryPort;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot([UserEntity, UserPreferenceEntity, RefreshTokenEntity]);

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [`.env.${process.env.NODE_ENV || 'test'}`, '.env.development'],
        }),
        messageModule,
        databaseModule,
        UsersModule,
        AuthModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
    repository = app.get<TokensRepositoryPort>(TokensRepositoryPort);
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedUsers();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  it('returns entity by jti after persisting refresh session', async () => {
    const userId = '4807f235-f4b4-41c0-939c-c97371219551';
    const sessionId = 'd52b6136-cc7e-4c56-b7d3-48768f5fbeb0';
    const tokenHash = hash('refresh-token');

    const userIdOrError = requireUniqueEntityId(userId);

    const refreshTokenOrError = RefreshToken.create(
      {
        userId: userIdOrError,
        tokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        revokedAt: null,
        refreshedAt: null,
        deviceId: 'device-A',
      },
      sessionId,
    );

    if (refreshTokenOrError.isLeft()) {
      throw refreshTokenOrError.value;
    }

    const saveResult = await repository.save(refreshTokenOrError.value);
    if (saveResult.isLeft()) {
      throw saveResult.value;
    }

    const sessionIdOrError = requireUniqueEntityId(sessionId);
    const foundSession = await repository.findByJti(sessionIdOrError);

    expect(foundSession.isRight()).toBe(true);
    expect(foundSession.isRight() ? foundSession.value.id.value : '').toBe(sessionId);
    expect(foundSession.isRight() ? foundSession.value.tokenHash : '').toBe(tokenHash);
  });
});

function requireUniqueEntityId(value: string) {
  const result = UniqueEntityID.create(value);
  if (result.isLeft()) {
    throw result.value;
  }
  return result.value;
}

const hash = (value: string): string => createHash('sha256').update(value).digest('hex');
