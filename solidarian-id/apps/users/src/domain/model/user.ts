import { Entity } from '@app/ddd/entity';
import { Either, right } from '@app/ddd/either';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Password } from '@app/value-objects/model/password';
import { InvalidUserError } from '../errors/invalid-user-error';
import { UserLocation } from '@app/value-objects/model/user-location';

export interface UserProps {
  username: Username;
  mobilePhone: MobilePhone;
  hashedPassword: Password;
  location: UserLocation;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get username(): Username {
    return this.props.username;
  }

  get mobilePhone(): MobilePhone {
    return this.props.mobilePhone;
  }

  get password(): Password {
    return this.props.hashedPassword;
  }

  get location(): UserLocation {
    return this.props.location;
  }

  public static create(
    props: UserProps,
    id?: UniqueEntityID,
  ): Either<InvalidUserError, User> {
    // Sin validación por ahora, solo creamos el usuario
    return right(new User(props, id));
  }
}
