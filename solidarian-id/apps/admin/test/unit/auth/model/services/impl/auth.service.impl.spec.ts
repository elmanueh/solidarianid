import { AdministratorRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/administrator.repository.port';
import { AuthService } from '@app/admin/administrator/model/domain/services/auth.service';
import { AuthServiceImpl } from '@app/admin/auth/model/services/impl/auth.service.impl';
import { PasswordManager } from '@app/utils/security/password-manager';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Test, TestingModule } from '@nestjs/testing';

// Valid bcrypt hash for testing (represents 'ValidPass123!')
const VALID_BCRYPT_HASH = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.k0s8FO/pB.OMnXJzqy';

describe('AuthServiceImpl', () => {
  let service: AuthService;
  let mockPasswordService: {
    validateAndHashPassword: jest.Mock;
    comparePassword: jest.Mock;
  };
  let mockAdministratorRepository: {
    findByEmail: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(async () => {
    mockPasswordService = {
      validateAndHashPassword: jest.fn(),
      comparePassword: jest.fn(),
    };
    mockAdministratorRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    service = new AuthServiceImpl(
      mockPasswordService as unknown as PasswordManager,
      mockAdministratorRepository as unknown as AdministratorRepositoryPort,
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthServiceImpl,
        { provide: PasswordManager, useValue: mockPasswordService },
        {
          provide: AdministratorRepositoryPort,
          useValue: mockAdministratorRepository,
        },
      ],
    }).compile();

    service = module.get<AuthServiceImpl>(AuthServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("White Box Testing of AuthServiceImpl's methods", () => {
    describe('register', () => {
      describe('Basic Path Testing (Cyclomatic Complexity)', () => {
        it('should return ConflictError when administrator already exists (path 1)', async () => {
          // Arrange
          const mockAdmin = {
            id: '123',
            fullname: 'Existing Admin',
            email: 'existing@test.com',
            phone: '+34123456789',
            password: 'hashedPassword',
          };
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => true,
            isLeft: () => false,
            value: mockAdmin,
          });

          // Act
          const result = await service.register('New Admin', 'existing@test.com', '+34987654321', 'ValidPass123!');

          // Assert
          expect(result.isLeft()).toBe(true);
          expect(result.value).toBeInstanceOf(Error);
          expect((result.value as Error).message).toContain('Administrator with this email already exists');
          expect(mockAdministratorRepository.findByEmail).toHaveBeenCalledWith('existing@test.com');
          expect(mockPasswordService.validateAndHashPassword).not.toHaveBeenCalled();
        });

        it('should return ValidationError when password validation fails (path 2)', async () => {
          // Arrange
          const validationError = new ValidationError('Password is too weak');
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });
          mockPasswordService.validateAndHashPassword.mockResolvedValue({
            isLeft: () => true,
            isRight: () => false,
            value: validationError,
          });

          // Act
          const result = await service.register('New Admin', 'new@test.com', '+34987654321', 'weak');

          // Assert
          expect(result.isLeft()).toBe(true);
          expect(result.value).toBe(validationError);
          expect(mockPasswordService.validateAndHashPassword).toHaveBeenCalledWith('weak');
          expect(mockAdministratorRepository.save).not.toHaveBeenCalled();
        });

        it('should return ValidationError when Administrator.create fails (path 3)', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });
          mockPasswordService.validateAndHashPassword.mockResolvedValue({
            isLeft: () => false,
            isRight: () => true,
            value: 'hashedPassword123',
          });

          // Act - Invalid fullname to make Administrator.create fail
          const result = await service.register(
            '', // Empty fullname should fail
            'new@test.com',
            '+34987654321',
            'ValidPass123!',
          );
          // Assert
          expect(result.isLeft()).toBe(true);
          expect(result.value).toBeInstanceOf(Error);
          expect(mockAdministratorRepository.save).not.toHaveBeenCalled();
        });

        it('should successfully register a new administrator when all validations pass (path 4)', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });
          mockPasswordService.validateAndHashPassword.mockResolvedValue({
            isLeft: () => false,
            isRight: () => true,
            value: VALID_BCRYPT_HASH,
          });
          mockAdministratorRepository.save.mockResolvedValue(undefined);

          // Act
          const result = await service.register('New Administrator', 'new@test.com', '+34987654321', 'ValidPass123!');

          // Assert
          expect(result.isRight()).toBe(true);
          expect(mockAdministratorRepository.findByEmail).toHaveBeenCalledWith('new@test.com');
          expect(mockPasswordService.validateAndHashPassword).toHaveBeenCalledWith('ValidPass123!');
          expect(mockAdministratorRepository.save).toHaveBeenCalledTimes(1);
        });
      });

      describe('Condition Testing', () => {
        it('should test condition: existingAdministrator.isRight() === true', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => true,
            isLeft: () => false,
            value: { email: 'existing@test.com' },
          });

          // Act
          const result = await service.register('Test', 'existing@test.com', '+34123456789', 'Pass123!');

          // Assert
          expect(result.isLeft()).toBe(true);
          expect((result.value as Error).message).toContain('Administrator with this email already exists');
        });

        it('should test condition: existingAdministrator.isRight() === false', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });
          mockPasswordService.validateAndHashPassword.mockResolvedValue({
            isLeft: () => false,
            isRight: () => true,
            value: VALID_BCRYPT_HASH,
          });
          mockAdministratorRepository.save.mockResolvedValue(undefined);

          // Act
          const result = await service.register('Valid Name', 'new@test.com', '+34123456789', 'ValidPass123!');

          // Assert - Should proceed to password validation
          expect(result.isLeft()).toBe(false);
          expect(mockPasswordService.validateAndHashPassword).toHaveBeenCalled();
        });

        it('should test condition: passwordHashOrError.isLeft() === true', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });
          mockPasswordService.validateAndHashPassword.mockResolvedValue({
            isLeft: () => true,
            isRight: () => false,
            value: new Error('Invalid password'),
          });

          // Act
          const result = await service.register('Test', 'test@test.com', '+34123456789', 'weak');

          // Assert
          expect(result.isLeft()).toBe(true);
          expect((result.value as Error).message).toContain('Invalid password');
        });

        it('should test condition: passwordHashOrError.isLeft() === false', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });
          mockPasswordService.validateAndHashPassword.mockResolvedValue({
            isLeft: () => false,
            isRight: () => true,
            value: VALID_BCRYPT_HASH,
          });
          mockAdministratorRepository.save.mockResolvedValue(undefined);

          // Act
          const result = await service.register('Valid Name', 'test@test.com', '+34123456789', 'ValidPass123!');

          // Assert - Should proceed to Administrator.create
          expect(result).toBeDefined();
        });

        it('should test condition: newAdminOrError.isLeft() === true', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });
          mockPasswordService.validateAndHashPassword.mockResolvedValue({
            isLeft: () => false,
            isRight: () => true,
            value: 'hashedPassword',
          });

          // Act - Using invalid data to trigger Administrator.create failure
          const result = await service.register(
            '', // Invalid fullname
            'test@test.com',
            '+34123456789',
            'ValidPass123!',
          );

          // Assert
          expect(result.isLeft()).toBe(true);
          expect(result.value).toBeInstanceOf(Error);
          expect(mockAdministratorRepository.save).not.toHaveBeenCalled();
        });

        it('should test condition: newAdminOrError.isLeft() === false', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });
          mockPasswordService.validateAndHashPassword.mockResolvedValue({
            isLeft: () => false,
            isRight: () => true,
            value: VALID_BCRYPT_HASH,
          });
          mockAdministratorRepository.save.mockResolvedValue(undefined);

          // Act
          const result = await service.register('Valid Administrator', 'new@test.com', '+34123456789', 'ValidPass123!');

          // Assert - Should save the administrator
          expect(mockAdministratorRepository.save).toHaveBeenCalled();
          expect(result.isRight()).toBe(true);
        });
      });
    });

    describe('login', () => {
      describe('Basic Path Testing (Cyclomatic Complexity)', () => {
        it('Path 1: should return AuthError when administrator is not found', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Administrator not found'),
          });

          // Act
          const result = await service.login('nonexistent@test.com', 'anyPassword');

          // Assert
          expect(result.isLeft()).toBe(true);
          expect((result.value as Error).message).toContain('Email o contraseña incorrectos');
          expect(mockAdministratorRepository.findByEmail).toHaveBeenCalledWith('nonexistent@test.com');
          expect(mockPasswordService.comparePassword).not.toHaveBeenCalled();
        });

        it('Path 2: should return AuthError when password is invalid', async () => {
          // Arrange
          const mockAdmin = {
            id: '123',
            fullname: 'Test Admin',
            email: 'admin@test.com',
            phone: '+34123456789',
            password: 'hashedCorrectPassword',
          };
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => true,
            isLeft: () => false,
            value: mockAdmin,
          });
          mockPasswordService.comparePassword.mockResolvedValue(false);

          // Act
          const result = await service.login('admin@test.com', 'wrongPassword');

          // Assert
          expect(result.isLeft()).toBe(true);
          expect((result.value as Error).message).toContain('Email o contraseña incorrectos');
          expect(mockPasswordService.comparePassword).toHaveBeenCalledWith('wrongPassword', 'hashedCorrectPassword');
        });

        it('Path 3: should successfully login when credentials are valid', async () => {
          // Arrange
          const mockAdmin = {
            id: '123',
            fullname: 'Test Admin',
            email: 'admin@test.com',
            phone: '+34123456789',
            password: 'hashedCorrectPassword',
          };
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => true,
            isLeft: () => false,
            value: mockAdmin,
          });
          mockPasswordService.comparePassword.mockResolvedValue(true);

          // Act
          const result = await service.login('admin@test.com', 'correctPassword');

          // Assert
          expect(result.isRight()).toBe(true);
          expect(result.value).toEqual(mockAdmin);
          expect(mockAdministratorRepository.findByEmail).toHaveBeenCalledWith('admin@test.com');
          expect(mockPasswordService.comparePassword).toHaveBeenCalledWith('correctPassword', 'hashedCorrectPassword');
        });
      });

      describe('Condition Testing', () => {
        it('should test condition: adminOrError.isLeft() === true', async () => {
          // Arrange
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => false,
            isLeft: () => true,
            value: new Error('Not found'),
          });

          // Act
          const result = await service.login('notfound@test.com', 'password');

          // Assert
          expect(result.isLeft()).toBe(true);
          expect((result.value as Error).message).toContain('Email o contraseña incorrectos');
        });

        it('should test condition: adminOrError.isLeft() === false', async () => {
          // Arrange
          const mockAdmin = {
            id: '123',
            email: 'admin@test.com',
            password: 'hashedPassword',
          };
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => true,
            isLeft: () => false,
            value: mockAdmin,
          });
          mockPasswordService.comparePassword.mockResolvedValue(true);

          // Act
          const result = await service.login('admin@test.com', 'password');

          // Assert - Should proceed to password comparison
          expect(mockPasswordService.comparePassword).toHaveBeenCalled();
          expect(result.isRight()).toBe(true);
        });

        it('should test condition: isPasswordValid === false', async () => {
          // Arrange
          const mockAdmin = {
            id: '123',
            email: 'admin@test.com',
            password: 'hashedPassword',
          };
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => true,
            isLeft: () => false,
            value: mockAdmin,
          });
          mockPasswordService.comparePassword.mockResolvedValue(false);

          // Act
          const result = await service.login('admin@test.com', 'wrongPassword');

          // Assert
          expect(result.isLeft()).toBe(true);
          expect((result.value as Error).message).toContain('Email o contraseña incorrectos');
        });

        it('should test condition: isPasswordValid === true', async () => {
          // Arrange
          const mockAdmin = {
            id: '123',
            email: 'admin@test.com',
            password: 'hashedPassword',
          };
          mockAdministratorRepository.findByEmail.mockResolvedValue({
            isRight: () => true,
            isLeft: () => false,
            value: mockAdmin,
          });
          mockPasswordService.comparePassword.mockResolvedValue(true);

          // Act
          const result = await service.login('admin@test.com', 'correctPassword');

          // Assert
          expect(result.isRight()).toBe(true);
          expect(result.value).toEqual(mockAdmin);
        });
      });
    });
  });
});
