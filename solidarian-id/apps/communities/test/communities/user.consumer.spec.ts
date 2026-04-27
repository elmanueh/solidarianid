import { Test, TestingModule } from '@nestjs/testing';
import { UserConsumerAdapter } from '@app/communities/infrastructure/messaging/consumer/user.consumer';
import { UserService } from '@app/communities/domain/services/user.service';
import { left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { EventType, UserEvent, UserEventDto } from '@solidarianid/kafka';
import { Logger } from '@nestjs/common';

describe('UserConsumerAdapter', () => {
  let adapter: UserConsumerAdapter;
  let mockUserService: {
    createUser: jest.Mock;
    updateUser: jest.Mock;
  };

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'debug').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    mockUserService = {
      createUser: jest.fn(),
      updateUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserConsumerAdapter],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    adapter = module.get<UserConsumerAdapter>(UserConsumerAdapter);
  });

  describe('handleUserEvent', () => {
    const validPayload: UserEventDto = {
      id: 'user-123',
      fullName: 'Test User',
      username: 'testuser',
      mobilePhone: '1234567890',
      city: 'Test City',
      countryCode: 'TC',
    };

    const createUserEvent = (eventType: EventType): UserEvent => new UserEvent(eventType, validPayload);

    it('should handle USER_CREATED successfully', async () => {
      mockUserService.createUser.mockResolvedValueOnce(
        right({
          id: { value: 'user-123' },
          email: 'test@example.com',
          fullName: 'Test User',
        }),
      );

      await expect(adapter.handleUserEvent(createUserEvent(EventType.USER_CREATED))).resolves.not.toThrow();

      expect(mockUserService.createUser).toHaveBeenCalledWith(validPayload);
    });

    it('should handle USER_UPDATED successfully', async () => {
      mockUserService.updateUser.mockResolvedValueOnce(
        right({
          id: { value: 'user-123' },
          email: 'test@example.com',
          fullName: 'Updated User',
        }),
      );

      await expect(adapter.handleUserEvent(createUserEvent(EventType.USER_UPDATED))).resolves.not.toThrow();

      expect(mockUserService.updateUser).toHaveBeenCalledWith(validPayload);
    });

    it('should handle error when createUser returns left', async () => {
      const error = new ValidationError('Invalid user data');
      mockUserService.createUser.mockResolvedValueOnce(left(error));

      await expect(adapter.handleUserEvent(createUserEvent(EventType.USER_CREATED))).resolves.not.toThrow();

      expect(mockUserService.createUser).toHaveBeenCalledWith(validPayload);
    });

    it('should handle error when updateUser returns left', async () => {
      const error = new RepositoryException('Database error');
      mockUserService.updateUser.mockResolvedValueOnce(left(error));

      await expect(adapter.handleUserEvent(createUserEvent(EventType.USER_UPDATED))).resolves.not.toThrow();

      expect(mockUserService.updateUser).toHaveBeenCalledWith(validPayload);
    });

    it('should handle unhandled event type', async () => {
      await expect(adapter.handleUserEvent(createUserEvent('UNKNOWN_EVENT' as EventType))).resolves.not.toThrow();
    });

    it('should catch and throw unexpected errors', async () => {
      mockUserService.createUser.mockRejectedValueOnce(new Error('Unexpected database error'));

      await expect(adapter.handleUserEvent(createUserEvent(EventType.USER_CREATED))).rejects.toThrow(
        'Unexpected database error',
      );
    });
  });
});
