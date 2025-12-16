import { ValueObject } from '@app/ddd/value-object';
import { Either, right } from '@app/ddd/either';
import { InvalidEmailError } from '@app/value-objects/errors/validation/email-validation-error';
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
    return right(new Email(plainEmail));
  }
}
