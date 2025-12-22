import { Entity } from '@app/ddd/entity';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Password } from '@app/value-objects/model/password';
import { UserLocation } from '@app/value-objects/model/user-location';

export interface UserProps {
  username: Username;
  mobilePhone: MobilePhone;
  password: Password;
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
    return this.props.password;
  }

  get location(): UserLocation {
    return this.props.location;
  }

  set username(value: Username) {
    this.props.username = value;
  }

  set mobilePhone(value: MobilePhone) {
    this.props.mobilePhone = value;
  }

  set password(value: Password) {
    this.props.password = value;
  }

  set location(value: UserLocation) {
    this.props.location = value;
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(props, id);
  }
}
