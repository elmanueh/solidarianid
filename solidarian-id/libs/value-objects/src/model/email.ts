import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidEmailError } from '@app/value-objects/errors/validation/email-validation-error';
import { EMAIL_REGEX } from '../constants/validation.constants';
export interface EmailProps {
  nombre: string;
  dominio: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(plainEmail: string) {
    const [nombre, dominio] = plainEmail.split('@');
    super({ nombre, dominio });
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get dominio(): string {
    return this.props.dominio;
  }

  public equals(other: Email): boolean {
    return this.nombre === other.nombre && this.dominio === other.dominio;
  }

  public static create(plainEmail: string): Either<InvalidEmailError, Email> {
    // Validar que no esté vacío
    if (!plainEmail || plainEmail.trim().length === 0) {
      return left(new InvalidEmailError('Email cannot be empty.'));
    }

    // Validar formato de email con regex
    // La regex ya valida implícitamente que hay exactamente un @ y el formato correcto
    if (!EMAIL_REGEX.test(plainEmail)) {
      return left(
        new InvalidEmailError(
          'Invalid email format. Must be in the format: user@doma.in',
        ),
      );
    }

    return right(new Email(plainEmail));
  }
}
