import { Either, left, right } from '@app/ddd/either';
import { PasswordTooWeakError } from '@app/value-objects/errors/validation/password-validation-error';
import { PasswordService } from '../password.service';
import {
  PASSWORD_COMPLEXITY_REGEX,
  PASSWORD_MIN_LENGTH,
} from '@app/value-objects/constants/validation.constants';
import { PasswordHasherUtil } from '@app/utils/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordServiceImpl implements PasswordService {
  async hashPassword(
    password: string,
  ): Promise<Either<PasswordTooWeakError, string>> {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return left(
        new PasswordTooWeakError(
          `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
        ),
      );
    }

    if (!PASSWORD_COMPLEXITY_REGEX.test(password)) {
      return left(
        new PasswordTooWeakError(
          `La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial`,
        ),
      );
    }

    const hashed = await PasswordHasherUtil.hash(password);
    return right(hashed);
  }
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return PasswordHasherUtil.compare(password, hashedPassword);
  }
}
