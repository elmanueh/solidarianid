import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { AdminConflictError } from 'apps/admin/src/administrator/model/domain/errors/admin-conflict.error';
import { AuthError } from 'apps/admin/src/administrator/model/domain/errors/auth.error';
import { Administrator } from 'apps/admin/src/administrator/model/domain/model/administrator';
import { AdministratorRepositoryPort } from 'apps/admin/src/administrator/model/domain/ports/output/administrator.repository.port';
import { AuthService } from 'apps/admin/src/administrator/model/domain/services/auth.service';
import { PasswordService } from '../password.service';
import { AdminAuthenticationError } from '@app/admin/administrator/model/domain/errors/admin-authentication.error';

/**
 * Servicio de autenticación
 * Contiene la lógica de negocio para autenticación
 */
@Injectable()
export class AuthServiceImpl extends AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly administratorRepository: AdministratorRepositoryPort,
  ) {
    super();
  }

  public async register(
    fullname: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<Either<AuthError | ValidationError, void>> {
    const existingAdministrator =
      await this.administratorRepository.findByEmail(email);

    if (existingAdministrator.isRight()) {
      return left(
        new AdminConflictError('Administrator with this email already exists'),
      );
    }

    const passwordHashOrError =
      await this.passwordService.hashPassword(password);

    if (passwordHashOrError.isLeft()) {
      return left(passwordHashOrError.value);
    }

    const hashedPassword = passwordHashOrError.value;

    const newAdminOrError = Administrator.create(
      fullname,
      email,
      phone,
      hashedPassword,
    );

    if (newAdminOrError.isLeft()) {
      return left(newAdminOrError.value);
    }

    const newAdmin = newAdminOrError.value;

    await this.administratorRepository.save(newAdmin);

    return right(undefined);
  }

  public async login(
    email: string,
    password: string,
  ): Promise<Either<AuthError, Administrator>> {
    const adminOrError = await this.administratorRepository.findByEmail(email);

    if (adminOrError.isLeft()) {
      return left(
        new AdminAuthenticationError('Email o contraseña incorrectos'),
      );
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      adminOrError.value.password,
    );

    if (!isPasswordValid) {
      return left(
        new AdminAuthenticationError('Email o contraseña incorrectos'),
      );
    }

    return right(adminOrError.value);
  }
}
