import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { Quantity } from '@app/value-objects/model/quantity';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Unit } from '@app/value-objects/model/unit';
import { User } from './user';
import { CurrentAmount } from '@app/value-objects/model/current-amount';

export interface ObjectiveProps {
  name: Name;
  description: Description;
  quantity: Quantity;
  unit: Unit;
  currentAmount: CurrentAmount;
  actionId: UniqueEntityID;
  contributors: User[];
}

interface ObjectiveCreationProps {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  actionId: string;
  contributors?: User[];
  currentAmount?: number;
}

export class Objective extends Entity<ObjectiveProps> {
  private constructor(props: ObjectiveProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get quantity(): number {
    return this.props.quantity.value;
  }

  get unit(): string {
    return this.props.unit.value;
  }

  get actionId(): string {
    return this.props.actionId.value;
  }

  get contributors(): ReadonlyArray<User> {
    return this.props.contributors;
  }

  get currentAmount(): number {
    return this.props.currentAmount.value;
  }

  /**
   * Create an objective.
   *
   * @return Either<InvalidNameError | InvalidDescriptionError | InvalidQuantityError | InvalidUnitError | InvalidUniqueEntityIDError, Objective>
   */
  public static create(
    props: ObjectiveCreationProps,
    id?: string,
  ): Either<ValidationError, Objective> {
    const uniqueId = UniqueEntityID.create(id);
    const name = Name.create(props.name);
    const description = Description.create(props.description);
    const quantity = Quantity.create(props.quantity);
    const unit = Unit.create(props.unit);
    const actionId = UniqueEntityID.create(props.actionId);
    const currentAmount = CurrentAmount.create(props.currentAmount || 0);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);
    if (quantity.isLeft()) return left(quantity.value);
    if (unit.isLeft()) return left(unit.value);
    if (actionId.isLeft()) return left(actionId.value);
    if (currentAmount.isLeft()) return left(currentAmount.value);

    const objectiveProps: ObjectiveProps = {
      name: name.value,
      description: description.value,
      quantity: quantity.value,
      unit: unit.value,
      actionId: actionId.value,
      contributors: props.contributors || [],
      currentAmount: currentAmount.value,
    };

    return right(new Objective(objectiveProps, uniqueId.value));
  }
}
