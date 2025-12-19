import { AggregateRoot } from '@app/ddd/aggregate-root';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

interface CommunityProps {
  name: Name;
  description: Description;
}

interface CommunityCreationProps {
  name: string;
  description: string;
}

export class Community extends AggregateRoot<CommunityProps> {
  get name(): string {
    return this.props.name.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  private constructor(props: CommunityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Create a community.
   *
   * @return Either<InvalidNameError | InvalidDescriptionError, Community>
   */
  public static create(
    props: CommunityCreationProps,
    id?: string,
  ): Either<ValidationError, Community> {
    const name = Name.create(props.name);
    const description = Description.create(props.description);
    const uniqueId = id ? UniqueEntityID.create(id) : undefined;

    if (name.isLeft()) {
      return left(name.value);
    }
    if (description.isLeft()) {
      return left(description.value);
    }
    if (uniqueId != undefined && uniqueId.isLeft()) return left(uniqueId.value);

    const communityProps: CommunityProps = {
      name: name.value,
      description: description.value,
    };

    return right(new Community(communityProps, uniqueId?.value));
  }
}
