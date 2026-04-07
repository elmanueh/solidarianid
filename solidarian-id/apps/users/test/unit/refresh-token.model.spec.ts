import { RefreshToken } from '@app/users/domain/model/refresh-token';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

describe('RefreshToken domain model', () => {
  it('enforces userId as UniqueEntityID and exposes it unchanged', () => {
    const userId = UniqueEntityID.create('4807f235-f4b4-41c0-939c-c97371219551');
    if (userId.isLeft()) {
      throw userId.value;
    }

    const refresh = RefreshToken.create({
      userId: userId.value,
      tokenHash: 'hash-valid',
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: null,
      rotatedAt: null,
      deviceId: null,
    });

    expect(refresh.isRight()).toBe(true);
    if (refresh.isRight()) {
      expect(refresh.value.userId).toBe(userId.value);
      expect(refresh.value.userId.value).toBe('4807f235-f4b4-41c0-939c-c97371219551');
    }
  });

  it('rejects empty token hash and accepts valid hash', () => {
    const userId = UniqueEntityID.create('4807f235-f4b4-41c0-939c-c97371219551');
    if (userId.isLeft()) {
      throw userId.value;
    }

    const invalidRefresh = RefreshToken.create({
      userId: userId.value,
      tokenHash: '   ',
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: null,
      rotatedAt: null,
      deviceId: null,
    });

    const validRefresh = RefreshToken.create({
      userId: userId.value,
      tokenHash: 'hash-valid',
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: null,
      rotatedAt: null,
      deviceId: 'device-x',
    });

    expect(invalidRefresh.isLeft()).toBe(true);
    expect(validRefresh.isRight()).toBe(true);
  });
});
