import { left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { AuthServiceImpl } from '@app/users/application/services/auth.service.impl';
import { LoginInvalidException } from '@app/users/domain/errors/login-invalid.exception';
import { RefreshToken } from '@app/users/domain/model/refresh-token';
import { User } from '@app/users/domain/model/user';
import { TokensRepositoryPort } from '@app/users/domain/ports/tokens.repository.port';
import { UsersService } from '@app/users/domain/services/users.service';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { createHash } from 'node:crypto';

describe('AuthServiceImpl', () => {
  let service: AuthServiceImpl;
  let usersService: {
    authenticate: jest.Mock;
  };
  let tokensRepository: {
    save: jest.Mock;
    findByJti: jest.Mock;
  };
  let jwtService: {
    signAsync: jest.Mock;
    verifyAsync: jest.Mock;
  };

  beforeEach(async () => {
    usersService = {
      authenticate: jest.fn(),
    };

    tokensRepository = {
      save: jest.fn(),
      findByJti: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn(),
      verifyAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthServiceImpl,
        { provide: UsersService, useValue: usersService },
        { provide: TokensRepositoryPort, useValue: tokensRepository },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthServiceImpl>(AuthServiceImpl);
  });

  it('issues access/refresh tokens with sub=userId and refresh jti on authenticate', async () => {
    const user = makeUser('4807f235-f4b4-41c0-939c-c97371219551');
    usersService.authenticate.mockResolvedValue(right(user));
    jwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');
    tokensRepository.save.mockResolvedValue(right(undefined));

    const result = await service.loginUsernamePassword('testUsername', 'Admin2024!Pass');

    expect(result.isRight()).toBe(true);
    expect(result.isRight() ? result.value.accessToken : '').toBe('access-token');
    expect(result.isRight() ? result.value.refreshToken : '').toBe('refresh-token');

    expect(jwtService.signAsync).toHaveBeenNthCalledWith(
      1,
      { sub: '4807f235-f4b4-41c0-939c-c97371219551' },
      expect.objectContaining({ algorithm: 'RS256', expiresIn: '15m' }),
    );
    expect(jwtService.signAsync).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        sub: '4807f235-f4b4-41c0-939c-c97371219551',
        jti: expect.any(String) as string,
      }),
      expect.objectContaining({ algorithm: 'RS256', expiresIn: '90d' }),
    );
    expect(tokensRepository.findByJti).not.toHaveBeenCalled();
    expect(tokensRepository.save).toHaveBeenCalledTimes(1);
  });

  it('supports concurrent logins without revoking previous sessions', async () => {
    const user = makeUser('4807f235-f4b4-41c0-939c-c97371219551');
    usersService.authenticate.mockResolvedValue(right(user));
    jwtService.signAsync
      .mockResolvedValueOnce('access-token-1')
      .mockResolvedValueOnce('refresh-token-1')
      .mockResolvedValueOnce('access-token-2')
      .mockResolvedValueOnce('refresh-token-2');
    tokensRepository.save.mockResolvedValue(right(undefined));

    const firstResult = await service.loginUsernamePassword('testUsername', 'Admin2024!Pass');
    const secondResult = await service.loginUsernamePassword('testUsername', 'Admin2024!Pass');

    expect(firstResult.isRight()).toBe(true);
    expect(secondResult.isRight()).toBe(true);
    expect(tokensRepository.save).toHaveBeenCalledTimes(2);
  });

  it('refreshes only access token for the targeted jti session without rotating refresh token', async () => {
    jwtService.verifyAsync.mockResolvedValue({
      sub: '4807f235-f4b4-41c0-939c-c97371219551',
      jti: 'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    });
    const userIdResult = UniqueEntityID.create('4807f235-f4b4-41c0-939c-c97371219551');
    if (userIdResult.isLeft()) {
      throw userIdResult.value;
    }

    const activeRefresh = RefreshToken.create(
      {
        userId: userIdResult.value,
        tokenHash: hash('old-refresh-token'),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        revokedAt: null,
        refreshedAt: null,
        deviceId: 'device-A',
      },
      'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    );

    if (activeRefresh.isLeft()) {
      throw activeRefresh.value;
    }

    tokensRepository.findByJti.mockResolvedValue(right(activeRefresh.value));
    tokensRepository.save.mockResolvedValue(right(undefined));
    jwtService.signAsync.mockResolvedValueOnce('new-access-token');

    const result = await service.refresh('old-refresh-token');

    expect(result.isRight()).toBe(true);
    expect(result.isRight() ? result.value.accessToken : '').toBe('new-access-token');
    expect(result.isRight() ? result.value.refreshToken : '').toBe('old-refresh-token');
    expect(tokensRepository.findByJti).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae' }),
    );
    expect(tokensRepository.save).toHaveBeenCalledTimes(1);
    expect(tokensRepository.findByJti).toHaveBeenCalledTimes(1);
    expect(tokensRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ tokenHash: hash('old-refresh-token') }),
    );
  });

  it('revokes only the current session on logout by jti', async () => {
    const userIdResult = UniqueEntityID.create('4807f235-f4b4-41c0-939c-c97371219551');
    if (userIdResult.isLeft()) {
      throw userIdResult.value;
    }

    const activeRefresh = RefreshToken.create(
      {
        userId: userIdResult.value,
        tokenHash: hash('logout-refresh-token'),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        revokedAt: null,
        refreshedAt: null,
        deviceId: null,
      },
      'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    );

    if (activeRefresh.isLeft()) {
      throw activeRefresh.value;
    }

    tokensRepository.findByJti.mockResolvedValue(right(activeRefresh.value));
    tokensRepository.save.mockResolvedValue(right(undefined));

    const result = await service.logoutCurrentSession('f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae');

    expect(result.isRight()).toBe(true);
    expect(tokensRepository.findByJti).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae' }),
    );
    expect(tokensRepository.save).toHaveBeenCalledTimes(1);
  });

  it('rejects refresh when token payload has no jti', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: '4807f235-f4b4-41c0-939c-c97371219551' });

    const result = await service.refresh('old-refresh-token');

    expect(result.isLeft()).toBe(true);
    expect(tokensRepository.findByJti).not.toHaveBeenCalled();
    expect(tokensRepository.save).not.toHaveBeenCalled();
  });

  it('rejects refresh when cookie token hash does not match stored hash', async () => {
    jwtService.verifyAsync.mockResolvedValue({
      sub: '4807f235-f4b4-41c0-939c-c97371219551',
      jti: 'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    });
    const userIdResult = UniqueEntityID.create('4807f235-f4b4-41c0-939c-c97371219551');
    if (userIdResult.isLeft()) {
      throw userIdResult.value;
    }

    const activeRefresh = RefreshToken.create(
      {
        userId: userIdResult.value,
        tokenHash: 'hash-something-else',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        revokedAt: null,
        refreshedAt: null,
        deviceId: null,
      },
      'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    );

    if (activeRefresh.isLeft()) {
      throw activeRefresh.value;
    }

    tokensRepository.findByJti.mockResolvedValue(right(activeRefresh.value));

    const result = await service.refresh('old-refresh-token');

    expect(result.isLeft()).toBe(true);
    expect(tokensRepository.save).not.toHaveBeenCalled();
  });

  it('persists device id when provided on login', async () => {
    const user = makeUser('4807f235-f4b4-41c0-939c-c97371219551');
    usersService.authenticate.mockResolvedValue(right(user));
    jwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');
    tokensRepository.save.mockResolvedValue(right(undefined));

    const result = await service.loginUsernamePassword('testUsername', 'Admin2024!Pass', 'device-mobile');

    expect(result.isRight()).toBe(true);
    expect(tokensRepository.save).toHaveBeenCalledWith(expect.objectContaining({ deviceId: 'device-mobile' }));
  });

  it('stores null device id when login has no X-Device-Id', async () => {
    const user = makeUser('4807f235-f4b4-41c0-939c-c97371219551');
    usersService.authenticate.mockResolvedValue(right(user));
    jwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');
    tokensRepository.save.mockResolvedValue(right(undefined));

    const result = await service.loginUsernamePassword('testUsername', 'Admin2024!Pass');

    expect(result.isRight()).toBe(true);
    expect(tokensRepository.save).toHaveBeenCalledWith(expect.objectContaining({ deviceId: null }));
  });

  it('preserves existing device id on refresh when no new X-Device-Id is provided', async () => {
    jwtService.verifyAsync.mockResolvedValue({
      sub: '4807f235-f4b4-41c0-939c-c97371219551',
      jti: 'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    });
    const userIdResult = UniqueEntityID.create('4807f235-f4b4-41c0-939c-c97371219551');
    if (userIdResult.isLeft()) {
      throw userIdResult.value;
    }

    const activeRefresh = RefreshToken.create(
      {
        userId: userIdResult.value,
        tokenHash: hash('old-refresh-token'),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        revokedAt: null,
        refreshedAt: null,
        deviceId: 'device-A',
      },
      'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    );

    if (activeRefresh.isLeft()) {
      throw activeRefresh.value;
    }

    tokensRepository.findByJti.mockResolvedValue(right(activeRefresh.value));
    tokensRepository.save.mockResolvedValue(right(undefined));
    jwtService.signAsync.mockResolvedValueOnce('new-access-token');

    const result = await service.refresh('old-refresh-token');

    expect(result.isRight()).toBe(true);
    expect(result.isRight() ? result.value.refreshToken : '').toBe('old-refresh-token');
    expect(tokensRepository.save).toHaveBeenCalledTimes(1);
  });

  it('does not receive device id on refresh service API', async () => {
    jwtService.verifyAsync.mockResolvedValue({
      sub: '4807f235-f4b4-41c0-939c-c97371219551',
      jti: 'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    });
    const userIdResult = UniqueEntityID.create('4807f235-f4b4-41c0-939c-c97371219551');
    if (userIdResult.isLeft()) {
      throw userIdResult.value;
    }

    const activeRefresh = RefreshToken.create(
      {
        userId: userIdResult.value,
        tokenHash: hash('old-refresh-token'),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        revokedAt: null,
        refreshedAt: null,
        deviceId: null,
      },
      'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae',
    );

    if (activeRefresh.isLeft()) {
      throw activeRefresh.value;
    }

    tokensRepository.findByJti.mockResolvedValue(right(activeRefresh.value));
    tokensRepository.save.mockResolvedValue(right(undefined));
    jwtService.signAsync.mockResolvedValueOnce('new-access-token');

    const result = await service.refresh('old-refresh-token');

    expect(result.isRight()).toBe(true);
    expect(result.isRight() ? result.value.refreshToken : '').toBe('old-refresh-token');
    expect(tokensRepository.save).toHaveBeenCalledTimes(1);
  });

  it('propagates authentication failure during loginUsernamePassword', async () => {
    usersService.authenticate.mockResolvedValue(left(new LoginInvalidException()));

    const result = await service.loginUsernamePassword('testUsername', 'wrong');

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(LoginInvalidException);
    }
    expect(jwtService.signAsync).not.toHaveBeenCalled();
    expect(tokensRepository.save).not.toHaveBeenCalled();
  });

  it('returns right(undefined) on logoutCurrentSession when session does not exist', async () => {
    tokensRepository.findByJti.mockResolvedValue(
      left(new EntityNotFoundException('RefreshToken', 'f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae')),
    );

    const result = await service.logoutCurrentSession('f0a9db70-4667-4f13-b5a3-f85f5c0cb6ae');

    expect(result.isRight()).toBe(true);
    expect(tokensRepository.save).not.toHaveBeenCalled();
  });
});

const hash = (value: string): string => createHash('sha256').update(value).digest('hex');

function makeUser(id: string): User {
  const user = User.create(
    {
      fullName: 'Auth Test User',
      username: 'authTester',
      mobilePhone: '+34612345678',
      passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX',
      city: 'Madrid',
      countryCode: 'ES',
    },
    id,
  );

  if (user.isLeft()) {
    throw user.value;
  }

  return user.value;
}
