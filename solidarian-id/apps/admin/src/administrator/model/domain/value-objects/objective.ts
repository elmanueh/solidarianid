import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { Quantity } from '@app/value-objects/model/quantity';
import { Unit } from '@app/value-objects/model/unit';
import { CurrentAmount } from '@app/value-objects/model/current-amount';
import { ValueObject } from '@app/ddd/value-object';

interface ObjectiveProps {
  name: Name;
  description: Description;
  quantity: Quantity;
  unit: Unit;
  currentAmount: CurrentAmount;
}

export interface CreateObjectiveProps {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

export interface ReconstituteObjectiveProps {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  currentAmount: number;
}

export class Objective extends ValueObject<ObjectiveProps> {
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

  get currentAmount(): number {
    return this.props.currentAmount.value;
  }

  private constructor(props: ObjectiveProps) {
    super(props);
  }

  public static create(props: CreateObjectiveProps): Either<ValidationError, Objective> {
    const nameOrError = Name.create(props.name);
    if (nameOrError.isLeft()) return left(nameOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const quantityOrError = Quantity.create(props.quantity);
    if (quantityOrError.isLeft()) return left(quantityOrError.value);

    const unitOrError = Unit.create(props.unit);
    if (unitOrError.isLeft()) return left(unitOrError.value);

    const currentAmountOrError = CurrentAmount.create(0);
    if (currentAmountOrError.isLeft()) return left(currentAmountOrError.value);

    return right(
      new Objective({
        name: nameOrError.value,
        description: descriptionOrError.value,
        quantity: quantityOrError.value,
        unit: unitOrError.value,
        currentAmount: currentAmountOrError.value,
      }),
    );
  }

  public static reconstitute(props: ReconstituteObjectiveProps): Either<ValidationError, Objective> {
    const nameOrError = Name.create(props.name);
    if (nameOrError.isLeft()) return left(nameOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const quantityOrError = Quantity.create(props.quantity);
    if (quantityOrError.isLeft()) return left(quantityOrError.value);

    const unitOrError = Unit.create(props.unit);
    if (unitOrError.isLeft()) return left(unitOrError.value);

    const currentAmountOrError = CurrentAmount.create(props.currentAmount);
    if (currentAmountOrError.isLeft()) return left(currentAmountOrError.value);

    return right(
      new Objective({
        name: nameOrError.value,
        description: descriptionOrError.value,
        quantity: quantityOrError.value,
        unit: unitOrError.value,
        currentAmount: currentAmountOrError.value,
      }),
    );
  }
}
