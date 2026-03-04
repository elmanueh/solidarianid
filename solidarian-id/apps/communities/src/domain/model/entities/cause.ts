import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Either, left, right, sequence } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Duration } from '@app/value-objects/model/duration';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Entity } from '@app/ddd/entity';
import { Action } from './action';

export interface CauseProps {
  name: Name;
  description: Description;
  durationDays: Duration;
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  actions: Action[];
  communityId: UniqueEntityID;
  userIds: UniqueEntityID[];
}

interface CauseCreationProps {
  name: string;
  description: string;
  initialDate: Date;
  durationDays: number;
  ods: SustainableDevelopmentGoal[];
  actions?: Action[];
  communityId: string;
  userIds?: string[];
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

  get initialDate(): Date {
    return this.props.initialDate;
  }

  get actions(): ReadonlyArray<Action> {
    return this.props.actions;
  }

  get communityId(): string {
    return this.props.communityId?.value;
  }

  get userIds(): string[] {
    return this.props.userIds.map(userId => userId.value);
  }

  addOds(ods: SustainableDevelopmentGoal): void {
    this.props.ods.push(ods);
  }

  addAction(action: Action): void {
    this.props.actions.push(action);
  }

  hasFollower(userId: string): boolean {
    return this.props.userIds.some(currentUserId => currentUserId.value === userId);
  }

  addFollower(userId: string): Either<ValidationError, void> {
    const userIdOrError = UniqueEntityID.create(userId);

    if (userIdOrError.isLeft()) {
      return left(userIdOrError.value);
    }

    if (!this.hasFollower(userId)) {
      this.props.userIds.push(userIdOrError.value);
    }

    return right(undefined);
  }

  /**
   * Create a cause.
   *
   * @return Either<InvalidUniqueEntityIDError | InvalidNameError | InvalidDescriptionError | InvalidDurationDaysError, Cause>
   */
  public static create(props: CauseCreationProps, id?: string): Either<ValidationError, Cause> {
    const uniqueId = UniqueEntityID.create(id);
    const name = Name.create(props.name);
    const description = Description.create(props.description);
    const durationDays = Duration.create(props.durationDays);
    const communityId = UniqueEntityID.create(props.communityId);
    const userIdsOrError = sequence((props.userIds ?? []).map(userId => UniqueEntityID.create(userId)));

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);
    if (durationDays.isLeft()) return left(durationDays.value);
    if (communityId.isLeft()) return left(communityId.value);
    if (userIdsOrError.isLeft()) return left(userIdsOrError.value);

    const causeProps: CauseProps = {
      name: name.value,
      description: description.value,
      durationDays: durationDays.value,
      ods: props.ods,
      initialDate: props.initialDate,
      actions: props.actions ?? [],
      communityId: communityId.value,
      userIds: userIdsOrError.value,
    };

    return right(new Cause(causeProps, uniqueId.value));
  }
}
