import { Either, left, right } from '@app/ddd/either';
import { InvalidEmailError } from '@app/value-objects/errors/validation/email-validation-error';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Email } from '@app/value-objects/model/email';
import { Password } from '@app/value-objects/model/password';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminConflictError } from 'apps/admin/src/administrator/model/domain/errors/admin-conflict.error';
import { AuthError } from 'apps/admin/src/administrator/model/domain/errors/auth.error';
import { Administrator } from 'apps/admin/src/administrator/model/domain/model/administrator';
import { AdministratorRepositoryPort } from 'apps/admin/src/administrator/model/domain/ports/output/administrator.repository.port';
import { AuthService } from 'apps/admin/src/administrator/model/domain/services/auth.service';
import { Repository } from 'typeorm';

/**
 * Servicio de autenticación
 * Contiene la lógica de negocio para autenticación
 */
@Injectable()
export class AuthServiceImpl extends AuthService {
  constructor(
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

    const newAdminOrError = Administrator.create(
      fullname,
      email,
      phone,
      password,
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
  }
}
