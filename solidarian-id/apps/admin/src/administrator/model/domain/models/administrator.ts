import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Email } from '@app/value-objects/model/email';
import { FullName } from '@app/value-objects/model/fullname';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { HashedPassword } from '@app/value-objects/model/hashed-password';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

interface AdministratorProps {
  fullname: FullName;
  email: Email;
  phone: MobilePhone;
  password: HashedPassword;
}

export class Administrator extends Entity<AdministratorProps> {
  private constructor(props: AdministratorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    fullname: string,
    email: string,
    phone: string,
    hashedPassword: string,
  ): Either<ValidationError, Administrator> {
    const fullnameOrError = FullName.create(fullname);
    if (fullnameOrError.isLeft()) {
      return left(fullnameOrError.value);
    }

    const emailOrError = Email.create(email);
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const phoneOrError = MobilePhone.create(phone);
    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    const passwordOrError = HashedPassword.create(hashedPassword);
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const administrator = new Administrator({
      fullname: fullnameOrError.value,
      email: emailOrError.value,
      phone: phoneOrError.value,
      password: passwordOrError.value,
    });

    return right(administrator);
  }

  public static reconstitute(
    id: string,
    fullname: string,
    email: string,
    phone: string,
    password: string,
  ): Either<ValidationError, Administrator> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const fullnameOrError = FullName.create(fullname);
    if (fullnameOrError.isLeft()) {
      return left(fullnameOrError.value);
    }

    const emailOrError = Email.create(email);
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const phoneOrError = MobilePhone.create(phone);
    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    const passwordOrError = HashedPassword.create(password);
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const administrator = new Administrator(
      {
        fullname: fullnameOrError.value,
        email: emailOrError.value,
        phone: phoneOrError.value,
        password: passwordOrError.value,
      },
      idOrError.value,
    );

    return right(administrator);
  }

  get fullname(): string {
    return this.props.fullname.value;
  }

  get email(): string {
    return `${this.props.email.nombre}@${this.props.email.dominio}`;
  }

  get phone(): string {
    return this.props.phone.value;
  }

  get password(): string {
    return this.props.password.value;
  }
}
