import { AggregateRoot } from '@app/ddd/aggregate-root';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { User } from '../entities/user';
import { Cause } from '../entities/cause';

interface CommunityProps {
  name: Name;
  description: Description;
  creator: User;
  admins: User[];
  members: User[];
  causes: Cause[];
}

interface CommunityCreationProps {
  name: string;
  description: string;
  creator: User;
  admins?: User[];
  members?: User[];
  causes?: Cause[];
}

export class Community extends AggregateRoot<CommunityProps> {
  private constructor(props: CommunityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name.value;
  }

  set name(name: string) {
    const nameOrError = Name.create(name);
    if (nameOrError.isRight()) {
      this.props.name = nameOrError.value;
    }
  }

  get description(): string {
    return this.props.description.value;
  }

  set description(description: string) {
    const descriptionOrError = Description.create(description);
    if (descriptionOrError.isRight()) {
      this.props.description = descriptionOrError.value;
    }
  }

  get creator(): User {
    return this.props.creator;
  }

  get admins(): ReadonlyArray<User> {
    return this.props.admins;
  }

  get members(): ReadonlyArray<User> {
    return this.props.members;
  }

  get causes(): ReadonlyArray<Cause> {
    return this.props.causes;
  }

  get numMembers(): number {
    return this.props.members.length;
  }

  addMember(user: User): void {
    this.props.members.push(user);
  }

  addAdmin(user: User): void {
    this.props.admins.push(user);
  }

  add(cause: Cause): void {
    this.props.causes.push(cause);
  }

  hasMember(user: User): boolean {
    return this.props.members.some(m => m.id.equals(user.id));
  }

  hasAdmin(user: User): boolean {
    return this.props.admins.some(a => a.id.equals(user.id));
  }

  isAdminOrCreator(user: User): boolean {
    return this.props.admins.some(a => a.id.equals(user.id)) || this.isCreator(user);
  }

  isCreator(user: User): boolean {
    return this.props.creator.id.equals(user.id);
  }

  /**
   * Create a community.
   *
   * @return Either<InvalidUniqueEntityIDError | InvalidNameError | InvalidDescriptionError, Community>
   */
  public static create(props: CommunityCreationProps, id?: string): Either<ValidationError, Community> {
    const uniqueId = UniqueEntityID.create(id);
    const name = Name.create(props.name);
    const description = Description.create(props.description);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);

    const communityProps: CommunityProps = {
      name: name.value,
      description: description.value,
      creator: props.creator,
      admins: props.admins ?? [],
      members: props.members ?? [],
      causes: props.causes ?? [],
    };

    return right(new Community(communityProps, uniqueId.value));
  }
}
