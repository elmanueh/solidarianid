import { Either, left, right } from '@app/ddd/either';
import {
  PASSWORD_COMPLEXITY_REGEX,
  PASSWORD_MIN_LENGTH,
} from '@app/value-objects/constants/validation.constants';
import { PasswordTooWeakError } from '@app/value-objects/errors/validation/password-validation-error';

export abstract class PasswordService {
  async validateAndHashPassword(
    plainPassword: string,
  ): Promise<Either<PasswordTooWeakError, string>> {
    if (plainPassword.length < PASSWORD_MIN_LENGTH) {
      return left(
        new PasswordTooWeakError(
          `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
        ),
      );
    }

    if (!PASSWORD_COMPLEXITY_REGEX.test(plainPassword)) {
      return left(
        new PasswordTooWeakError(
          `La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial`,
        ),
      );
    }

    const hashedPassword: string = await this.hashPassword(plainPassword);
    return right(hashedPassword);
  }

  abstract hashPassword(plainPassword: string): Promise<string>;

  abstract comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
