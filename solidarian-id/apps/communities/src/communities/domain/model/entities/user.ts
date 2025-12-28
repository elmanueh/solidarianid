import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Username } from '@app/value-objects/model/username';

export interface UserProps {
  username: Username;
}

interface UserCreationProps {
  username: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get username(): string {
    return this.props.username.value;
  }

  /**
   * Create a user.
   *
   * @return Either<InvalidUniqueEntityIDError | InvalidUsernameError, User>
   */
  public static create(
    props: UserCreationProps,
    id?: string,
  ): Either<ValidationError, User> {
    const uniqueId = UniqueEntityID.create(id);
    const username = Username.create(props.username);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (username.isLeft()) return left(username.value);

    const userProps: UserProps = {
      username: username.value,
    };

    return right(new User(userProps, uniqueId.value));
  }
}
