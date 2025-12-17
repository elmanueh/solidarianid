import { ValueObject } from '@app/ddd/value-object';
import { Either, left, right } from '@app/ddd/either';
import { PasswordTooWeakError } from '@app/value-objects/errors/validation/password-validation-error';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_COMPLEXITY_REGEX,
} from '@app/value-objects/constants/validation.constants';
export interface PasswordProps {
  value: string;
}

export type HasherFunction = (text: string) => Promise<string>;

export class Password extends ValueObject<PasswordProps> {
  private constructor(plainPassword: string) {
    super({ value: plainPassword });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: Password): boolean {
    return this.value === other.value;
  }

  public static fromHash(hash: string): Password {
    return new Password(hash);
  }

  public static async create(
    plainText: string,
    hasher: HasherFunction,
  ): Promise<Either<PasswordTooWeakError, Password>> {
    // 1. Validación de Longitud (Mínimo 12)
    if (!plainText || plainText.length < PASSWORD_MIN_LENGTH) {
      return left(
        new PasswordTooWeakError(
          `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
        ),
      );
    }

    // 2. Validación de Complejidad (Mayúscula, Número, Carácter Especial)
    // Regex:
    // (?=.*[A-Z]) -> Al menos una mayúscula
    // (?=.*\d)    -> Al menos un número
    // (?=.*[\W_]) -> Al menos un símbolo (no alfanumérico)

    if (!PASSWORD_COMPLEXITY_REGEX.test(plainText)) {
      return left(
        new PasswordTooWeakError(
          'Password must include at least one uppercase letter, one number, and one special character.',
        ),
      );
    }

    // 3. Generación del Hash
    const hash = await hasher(plainText);

    return right(new Password(hash));
  }
}
