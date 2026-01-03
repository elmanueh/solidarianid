import { Entity } from '@app/ddd/entity';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { UserLocation } from '@app/value-objects/model/user-location';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right } from '@app/ddd/either';
import { HashedPassword } from '@app/value-objects/model/hashed-password';
import { FullName } from '@app/value-objects/model/fullname';

export interface UserProps {
  fullName: FullName;
  username: Username;
  mobilePhone: MobilePhone;
  passwordHash: HashedPassword;
  location: UserLocation;
}

export interface UserCreationProps {
  fullName: string;
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

  get fullName(): string {
    return this.props.fullName.value;
  }

  private set username(username: Username) {
    this.props.username = username;
  }

  private set mobilePhone(mobilePhone: MobilePhone) {
    this.props.mobilePhone = mobilePhone;
  }

  private set fullName(fullName: FullName) {
    this.props.fullName = fullName;
  }

  private set location(location: UserLocation) {
    this.props.location = location;
  }

  public updateUserProfile(
    fullName?: string,
    username?: string,
    mobilePhone?: string,
    city?: string,
    countryCode?: string,
  ): Either<ValidationError, void> {
    if (!fullName && !username && !mobilePhone && !city && !countryCode) {
      return left(new ValidationError('At least one field must be provided to update the profile.'));
    }

    // Validaciones de location: si se proporciona alguno, deben proporcionarse los 2
    const locationFieldsProvided = [city, countryCode].filter(Boolean).length;
    if (locationFieldsProvided > 0 && locationFieldsProvided < 2) {
      return left(new ValidationError('City and country code must both be provided when updating user location'));
    }

    if (fullName) {
      const fullNameOrError = FullName.create(fullName);
      if (fullNameOrError.isLeft()) {
        return left(fullNameOrError.value);
      }
      this.fullName = fullNameOrError.value;
    }

    if (username) {
      const usernameOrError = Username.create(username);
      if (usernameOrError.isLeft()) {
        return left(usernameOrError.value);
      }
      this.username = usernameOrError.value;
    }

    if (mobilePhone) {
      const mobilePhoneOrError = MobilePhone.create(mobilePhone);
      if (mobilePhoneOrError.isLeft()) {
        return left(mobilePhoneOrError.value);
      }
      this.mobilePhone = mobilePhoneOrError.value;
    }

    if (city && countryCode) {
      const locationOrError = UserLocation.create({
        city,
        countryCode,
      });
      if (locationOrError.isLeft()) {
        return left(locationOrError.value);
      }
      this.location = locationOrError.value;
    }

    return right(undefined);
  }

  public static create(props: UserCreationProps, id?: string): Either<ValidationError, User> {
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

    const fullNameOrError = FullName.create(props.fullName);
    if (fullNameOrError.isLeft()) {
      return left(fullNameOrError.value);
    }

    // Create and return the User entity
    const user = new User(
      {
        fullName: fullNameOrError.value,
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
