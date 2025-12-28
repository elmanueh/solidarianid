import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { Quantity } from '@app/value-objects/model/quantity';
import { Unit } from '@app/value-objects/model/unit';

export interface ObjectiveProps {
  name: Name;
  description: Description;
  quantity: Quantity;
  unit: Unit;
}

interface ObjectiveCreationProps {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

export class Objective extends ValueObject<ObjectiveProps> {
  private constructor(props: ObjectiveProps) {
    super(props);
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

  /**
   * Create an objective.
   *
   * @return Either<InvalidNameError | InvalidDescriptionError | InvalidQuantityError | InvalidUnitError, Objective>
   */
  public static create(
    props: ObjectiveCreationProps,
  ): Either<ValidationError, Objective> {
    const name = Name.create(props.name);
    const description = Description.create(props.description);
    const quantity = Quantity.create(props.quantity);
    const unit = Unit.create(props.unit);

    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);
    if (quantity.isLeft()) return left(quantity.value);
    if (unit.isLeft()) return left(unit.value);

    const objectiveProps: ObjectiveProps = {
      name: name.value,
      description: description.value,
      quantity: quantity.value,
      unit: unit.value,
    };

    return right(new Objective(objectiveProps));
  }
}
