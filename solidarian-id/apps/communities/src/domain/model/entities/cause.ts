import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { DurationDays } from '@app/value-objects/model/duration-days';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Entity } from '@app/ddd/entity';
import { Action } from './action';

export interface CauseProps {
  name: Name;
  description: Description;
  durationDays: DurationDays;
  ods: SustainableDevelopmentGoal[];
  actions: Action[];
  communityId: UniqueEntityID;
}

interface CauseCreationProps {
  name: string;
  description: string;
  durationDays: number;
  ods: SustainableDevelopmentGoal[];
  actions?: Action[];
  communityId: string;
}

export class Cause extends Entity<CauseProps> {
  private constructor(props: CauseProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get durationDays(): number {
    return this.props.durationDays.value;
  }

  get ods(): SustainableDevelopmentGoal[] {
    return this.props.ods;
  }

  get actions(): ReadonlyArray<Action> {
    return this.props.actions;
  }

  get communityId(): string {
    return this.props.communityId?.value;
  }

  addOds(ods: SustainableDevelopmentGoal): void {
    this.props.ods.push(ods);
  }

  addAction(action: Action): void {
    this.props.actions.push(action);
  }

  /**
   * Create a cause.
   *
   * @return Either<InvalidUniqueEntityIDError | InvalidNameError | InvalidDescriptionError | InvalidDurationDaysError, Cause>
   */
  public static create(
    props: CauseCreationProps,
    id?: string,
  ): Either<ValidationError, Cause> {
    const uniqueId = UniqueEntityID.create(id);
    const name = Name.create(props.name);
    const description = Description.create(props.description);
    const durationDays = DurationDays.create(props.durationDays);
    const communityId = UniqueEntityID.create(props.communityId);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);
    if (durationDays.isLeft()) return left(durationDays.value);
    if (communityId.isLeft()) return left(communityId.value);

    const causeProps: CauseProps = {
      name: name.value,
      description: description.value,
      durationDays: durationDays.value,
      ods: props.ods,
      actions: props.actions ?? [],
      communityId: communityId.value,
    };

    return right(new Cause(causeProps, uniqueId.value));
  }
}
