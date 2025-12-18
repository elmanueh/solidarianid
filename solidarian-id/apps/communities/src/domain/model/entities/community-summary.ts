import { Entity } from '@app/ddd/entity';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

interface CommunitySummaryProps {
  name: string;
  description: string;
}

export class CommunitySummary extends Entity<CommunitySummaryProps> {
  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  private constructor(props: CommunitySummaryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: {
      name: string;
      description: string;
    },
    id?: UniqueEntityID,
  ): CommunitySummary {
    return new CommunitySummary(
      {
        name: props.name,
        description: props.description,
      },
      id,
    );
  }
}
