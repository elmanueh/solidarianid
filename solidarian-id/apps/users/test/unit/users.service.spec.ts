import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@app/users/application/services/users.service';
import { UsersRepositoryPort } from '@app/users/domain/ports/output/users.repository.port';
import { RegisterUserCommand } from '@app/users/domain/ports/input/users.service.port';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UserConflictError } from '@app/users/domain/errors/userconflict-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

describe('UsersService.registerUser (White Box Testing)', () => {
  let service: UsersService;
  let mockRepo: {
    existsByMobilePhone: jest.Mock;
    existsByUsername: jest.Mock;
    save: jest.Mock;
  };

  const validCommand: RegisterUserCommand = {
    username: 'johnDoe',
    mobilePhone: '+34612345678',
    password: 'SecureP*ssw0rd123',
    city: 'Madrid',
    countryCode: 'ES',
  };

  beforeEach(async () => {
    mockRepo = {
      existsByMobilePhone: jest.fn(),
      existsByUsername: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepositoryPort, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Path 1: Invalid MobilePhone format', () => {
    it('should return ValidationError when mobile phone format is invalid', async () => {
      const command: RegisterUserCommand = {
        ...validCommand,
        mobilePhone: 'invalid-phone',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
    });
  });

  describe('Path 2: Invalid Username format', () => {
    it('should return ValidationError when username is too short', async () => {
      const command: RegisterUserCommand = {
        ...validCommand,
        username: 'a',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
    });

    it('should return ValidationError when username is empty', async () => {
      const command: RegisterUserCommand = {
        ...validCommand,
        username: '',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
    });
  });

  describe('Path 3: Invalid Password format', () => {
    it('should return ValidationError when password is too weak', async () => {
      const command: RegisterUserCommand = {
        ...validCommand,
        password: '123',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
    });
  });

  describe('Path 4: Invalid UserLocation', () => {
    it('should return ValidationError when country code is invalid', async () => {
      const command: RegisterUserCommand = {
        ...validCommand,
        countryCode: 'XXYY',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
    });

    it('should return ValidationError when city is empty', async () => {
      const command: RegisterUserCommand = {
        ...validCommand,
        city: '',
      };

      const result = await service.registerUser(command);

      expect(result.isLeft() && result.value instanceof ValidationError).toBe(
        true,
      );
    });
  });

  describe('Path 5: Repository error on existsByMobilePhone', () => {
    it('should return RepositoryException when existsByMobilePhone fails', async () => {
      const repoError = new RepositoryException('Database connection error');
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(left(repoError));

      const result = await service.registerUser(validCommand);

      expect(
        result.isLeft() && result.value instanceof RepositoryException,
      ).toBe(true);
    });
  });

  describe('Path 6: Mobile phone already exists', () => {
    it('should return UserConflictError when mobile phone is already registered', async () => {
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(true));

      const result = await service.registerUser(validCommand);

      expect(result.isLeft() && result.value instanceof UserConflictError).toBe(
        true,
      );
    });
  });

  describe('Path 7: Repository error on existsByUsername', () => {
    it('should return RepositoryException when existsByUsername fails', async () => {
      const repoError = new RepositoryException('Database timeout');
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(left(repoError));

      const result = await service.registerUser(validCommand);

      expect(
        result.isLeft() && result.value instanceof RepositoryException,
      ).toBe(true);
    });
  });

  describe('Path 8: Username already exists', () => {
    it('should return UserConflictError when username is already registered', async () => {
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(true));

      const result = await service.registerUser(validCommand);

      expect(result.isLeft() && result.value instanceof UserConflictError).toBe(
        true,
      );
    });
  });

  describe('Path 9: Repository error on save', () => {
    it('should return RepositoryException when save operation fails', async () => {
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

  describe('Path 10: Successful registration', () => {
    it('should return Right with user ID when registration is successful', async () => {
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      const result = await service.registerUser(validCommand);

      expect(
        result.isRight() &&
          typeof result.value === 'string' &&
          result.value.length > 0,
      ).toBe(true);
    });

    it('should call existsByMobilePhone with correct MobilePhone value object', async () => {
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      await service.registerUser(validCommand);

      expect(mockRepo.existsByMobilePhone).toHaveBeenCalledWith(
        expect.objectContaining({ value: validCommand.mobilePhone }),
      );
    });

    it('should call existsByUsername with correct Username value object', async () => {
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      await service.registerUser(validCommand);

      expect(mockRepo.existsByUsername).toHaveBeenCalledWith(
        expect.objectContaining({ value: validCommand.username }),
      );
    });

    it('should call save with User entity containing id', async () => {
      mockRepo.existsByMobilePhone.mockResolvedValueOnce(right(false));
      mockRepo.existsByUsername.mockResolvedValueOnce(right(false));
      mockRepo.save.mockResolvedValueOnce(right(undefined));

      await service.registerUser(validCommand);

      expect(mockRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: expect.anything() as unknown }),
      );
    });
  });
});
