import { Either } from '@app/ddd/either';
import { PasswordTooWeakError } from '@app/value-objects/errors/validation/password-validation-error';

export abstract class PasswordService {
  abstract hashPassword(
    password: string,
  ): Promise<Either<PasswordTooWeakError, string>>;
  abstract comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
