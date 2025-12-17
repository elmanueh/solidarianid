import { AggregateRoot } from "@app/ddd/aggregate-root";
import { UniqueEntityID } from "@app/ddd/unique-entity-id";

interface CommunityProps {
  name: string;
  description: string;
}

export class Community extends AggregateRoot<CommunityProps> {

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  private constructor(props: CommunityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: {
      name: string;
      description: string;
    },
    id?: UniqueEntityID,
  ): Community {

    return new Community(
      {
        name: props.name,
        description: props.description,
      },
      id,
    );
  }
}