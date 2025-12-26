import { Entity } from '@app/ddd/entity';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { UserLocation } from '@app/value-objects/model/user-location';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right } from '@app/ddd/either';
import { HashedPassword } from '@app/value-objects/model/hashed-password';

export interface UserProps {
  username: Username;
  mobilePhone: MobilePhone;
  passwordHash: HashedPassword;
  location: UserLocation;
}

export interface UserCreationProps {
  username: string;
  mobilePhone: string;
  passwordHash: string;
  city: string;
  countryCode: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get username(): string {
    return this.props.username.value;
  }

  get mobilePhone(): string {
    return this.props.mobilePhone.value;
  }

  get passwordHash(): string {
    return this.props.passwordHash.value;
  }

  get city(): string {
    return this.props.location.city;
  }

  get countryCode(): string {
    return this.props.location.countryCode;
  }

  public static create(
    props: UserCreationProps,
    id?: string,
  ): Either<ValidationError, User> {
    // Create UniqueEntityID if id is provided
    let entityId: UniqueEntityID | undefined;
    if (id) {
      const entityIdOrError = UniqueEntityID.create(id);
      if (entityIdOrError.isLeft()) {
        return left(entityIdOrError.value);
      }
      entityId = entityIdOrError.value;
    }

    // Create all value objects from plain props
    const usernameOrError = Username.create(props.username);
    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value);
    }

    const mobilePhoneOrError = MobilePhone.create(props.mobilePhone);
    if (mobilePhoneOrError.isLeft()) {
      return left(mobilePhoneOrError.value);
    }

    const passwordHashOrError = HashedPassword.create(props.passwordHash);
    if (passwordHashOrError.isLeft()) {
      return left(passwordHashOrError.value);
    }

    const locationOrError = UserLocation.create({
      city: props.city,
      countryCode: props.countryCode,
    });
    if (locationOrError.isLeft()) {
      return left(locationOrError.value);
    }

    // Create and return the User entity
    const user = new User(
      {
        username: usernameOrError.value,
        mobilePhone: mobilePhoneOrError.value,
        passwordHash: passwordHashOrError.value,
        location: locationOrError.value,
      },
      entityId,
    );

    return right(user);
  }
}
