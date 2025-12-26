import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceImpl } from '@app/users/application/services/users.service.impl';
import { UsersRepositoryPort } from '@app/users/domain/ports/users.repository.port';
import { RegisterUserCommand } from '@app/users/domain/services/users.service';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UserConflictError } from '@app/users/domain/errors/userconflict-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { PasswordManager } from '@app/utils/security/password-manager';

describe('UsersService.registerUser (White Box Testing)', () => {
  let service: UsersServiceImpl;
  let mockRepo: {
    existsByMobilePhone: jest.Mock;
    existsByUsername: jest.Mock;
    save: jest.Mock;
  };
  let mockPasswordManager: {
    validateAndHashPassword: jest.Mock;
  };

  const validCommand: RegisterUserCommand = {
    username: 'johnDoe',
    mobilePhone: '+34612345678',
    password: 'SecureP*ssw0rd123',
    city: 'Madrid',
    countryCode: 'ES',
  };

  const VALID_HASH =
    '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX';

  beforeEach(async () => {
    mockRepo = {
      existsByMobilePhone: jest.fn(),
      existsByUsername: jest.fn(),
      save: jest.fn(),
    };

    mockPasswordManager = {
      validateAndHashPassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersServiceImpl,
        { provide: UsersRepositoryPort, useValue: mockRepo },
        { provide: PasswordManager, useValue: mockPasswordManager },
      ],
    }).compile();

    service = module.get<UsersServiceImpl>(UsersServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Path 1: Password validation fails', () => {
    it('should return ValidationError when password is weak', async () => {
      const validationError = new ValidationError('Password is too weak');
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        left(validationError),
      );

      const command: RegisterUserCommand = {
        ...validCommand,
        password: '123',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
      expect(mockRepo.existsByMobilePhone).not.toHaveBeenCalled();
    });
  });

  describe('Path 2: MobilePhone format validation fails', () => {
    it('should return ValidationError when mobile phone format is invalid', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );

      const command: RegisterUserCommand = {
        ...validCommand,
        mobilePhone: 'invalid-phone',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
      expect(mockRepo.existsByMobilePhone).not.toHaveBeenCalled();
    });
  });

  describe('Path 3: Username format validation fails', () => {
    it('should return ValidationError when username is too short', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );

      const command: RegisterUserCommand = {
        ...validCommand,
        username: 'a',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
      expect(mockRepo.existsByMobilePhone).not.toHaveBeenCalled();
    });

    it('should return ValidationError when username is empty', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );

      const command: RegisterUserCommand = {
        ...validCommand,
        username: '',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
      expect(mockRepo.existsByMobilePhone).not.toHaveBeenCalled();
    });
  });

  describe('Path 4: Repository error on existsByMobilePhone', () => {
    it('should return RepositoryException when existsByMobilePhone fails', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      const repoError = new RepositoryException('Database connection error');
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(left(repoError));

      const result = await service.registerUser(validCommand);

      expect(
        result.isLeft() && result.value instanceof RepositoryException,
      ).toBe(true);
      expect(mockRepo.existsByUsername).not.toHaveBeenCalled();
    });
  });

  describe('Path 5: Mobile phone already exists', () => {
    it('should return UserConflictError when mobile phone is already registered', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(true));

      const result = await service.registerUser(validCommand);

      expect(result.isLeft() && result.value instanceof UserConflictError).toBe(
        true,
      );
      expect(mockRepo.existsByUsername).not.toHaveBeenCalled();
    });
  });

  describe('Path 6: Repository error on existsByUsername', () => {
    it('should return RepositoryException when existsByUsername fails', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      const repoError = new RepositoryException('Database timeout');
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(left(repoError));

      const result = await service.registerUser(validCommand);

      expect(
        result.isLeft() && result.value instanceof RepositoryException,
      ).toBe(true);
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('Path 7: Username already exists', () => {
    it('should return UserConflictError when username is already registered', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(true));

      const result = await service.registerUser(validCommand);

      expect(result.isLeft() && result.value instanceof UserConflictError).toBe(
        true,
      );
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('Path 8: User.create() validation fails', () => {
    it('should return ValidationError when country code is invalid', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));

      const command: RegisterUserCommand = {
        ...validCommand,
        countryCode: 'INVALID',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when city is empty', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));

      const command: RegisterUserCommand = {
        ...validCommand,
        city: '',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when hashed password is invalid', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right('short'), // Invalid hash (too short)
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));

      const result = await service.registerUser(validCommand);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('Path 9: Repository error on save', () => {
    it('should return RepositoryException when save operation fails', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      const repoError = new RepositoryException('Failed to persist user');
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(left(repoError));

      const result = await service.registerUser(validCommand);

      expect(
        result.isLeft() && result.value instanceof RepositoryException,
      ).toBe(true);
    });
  });

  describe('Path 10: Successful registration (Happy Path)', () => {
    it('should return Right with user ID when all validations pass', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      const result = await service.registerUser(validCommand);

      expect(result.isRight()).toBe(true);
      expect(typeof result.value).toBe('string');
      expect((result.value as string).length).toBeGreaterThan(0);
    });

    it('should call validateAndHashPassword with the provided password', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      await service.registerUser(validCommand);

      expect(mockPasswordManager.validateAndHashPassword).toHaveBeenCalledWith(
        validCommand.password,
      );
    });

    it('should call existsByMobilePhone with correct MobilePhone value object', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      await service.registerUser(validCommand);

      expect(mockRepo.existsByMobilePhone).toHaveBeenCalledWith(
        expect.objectContaining({ value: validCommand.mobilePhone }),
      );
    });

    it('should call existsByUsername with correct Username value object', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      await service.registerUser(validCommand);

      expect(mockRepo.existsByUsername).toHaveBeenCalledWith(
        expect.objectContaining({ value: validCommand.username }),
      );
    });

    it('should call save with User entity', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      await service.registerUser(validCommand);

      expect(mockRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should execute all steps in correct order', async () => {
      mockPasswordManager.validateAndHashPassword.mockResolvedValueOnce(
        right(VALID_HASH),
      );
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      await service.registerUser(validCommand);

      const mockCalls = [
        mockPasswordManager.validateAndHashPassword.mock.invocationCallOrder[0],
        mockRepo.existsByMobilePhone.mock.invocationCallOrder[0],
        mockRepo.existsByUsername.mock.invocationCallOrder[0],
        mockRepo.save.mock.invocationCallOrder[0],
      ];

      // Verify order: password → phone check → username check → save
      expect(mockCalls[0]).toBeLessThan(mockCalls[1]);
      expect(mockCalls[1]).toBeLessThan(mockCalls[2]);
      expect(mockCalls[2]).toBeLessThan(mockCalls[3]);
    });
  });
});
