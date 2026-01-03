import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Email } from '@app/value-objects/model/email';
import { FullName } from '@app/value-objects/model/fullname';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

export interface UserProps {
  fullName: FullName;
  mobilePhone?: MobilePhone;
  email?: Email;
}

interface UserCreationProps {
  fullName: string;
  mobilePhone?: string;
  email?: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get fullName(): string {
    return this.props.fullName.value;
  }

  get mobilePhone(): string | undefined {
    return this.props.mobilePhone?.value;
  }

  get email(): string | undefined {
    return this.props.email?.value;
  }

  /**
   * Create a user.
   *
   * @return Either<ValidationError, User>
   */
  public static create(props: UserCreationProps, id?: string): Either<ValidationError, User> {
    const uniqueId = UniqueEntityID.create(id);
    if (uniqueId.isLeft()) return left(uniqueId.value);

    const fullNameOrError = FullName.create(props.fullName);
    if (fullNameOrError.isLeft()) return left(fullNameOrError.value);

    let mobilePhone: MobilePhone | undefined;
    if (props.mobilePhone) {
      const mobilePhoneOrError = MobilePhone.create(props.mobilePhone);
      if (mobilePhoneOrError.isLeft()) return left(mobilePhoneOrError.value);
      mobilePhone = mobilePhoneOrError.value;
    }

    let email: Email | undefined;
    if (props.email) {
      const emailOrError = Email.create(props.email);
      if (emailOrError.isLeft()) return left(emailOrError.value);
    }

    const userProps: UserProps = {
      fullName: fullNameOrError.value,
      mobilePhone,
      email,
    };

    return right(new User(userProps, uniqueId.value));
  }
}
