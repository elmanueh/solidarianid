import { Cause } from '@app/communities/causes/domain/model/aggregates/cause';
import { User } from '@app/communities/communities/domain/model/entities/user';
import { AggregateRoot } from '@app/ddd/aggregate-root';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

interface CommunityProps {
  name: Name;
  description: Description;
  admins: User[];
  members: User[];
  causes: Cause[];
}

interface CommunityCreationProps {
  name: string;
  description: string;
  creator: User;
  causes: Cause[];
}

export class Community extends AggregateRoot<CommunityProps> {
  private constructor(props: CommunityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get admins(): User[] {
    return this.props.admins;
  }

  get members(): User[] {
    return this.props.members;
  }

  get causes(): Cause[] {
    return this.props.causes;
  }

  get numMembers(): number {
    return this.props.members.length;
  }

  addCause(cause: Cause): void {
    this.props.causes.push(cause);
  }

  addMember(user: User): void {
    this.props.members.push(user);
  }

  addAdmin(user: User): void {
    this.props.admins.push(user);
  }

  /**
   * Create a community.
   *
   * @return Either<InvalidUniqueEntityIDError | InvalidNameError | InvalidDescriptionError, Community>
   */
  public static create(
    props: CommunityCreationProps,
    id?: string,
  ): Either<ValidationError, Community> {
    const uniqueId = UniqueEntityID.create(id);
    const name = Name.create(props.name);
    const description = Description.create(props.description);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);

    const communityProps: CommunityProps = {
      name: name.value,
      description: description.value,
      admins: [props.creator],
      members: [props.creator],
      causes: props.causes,
    };

    return right(new Community(communityProps, uniqueId.value));
  }
}
