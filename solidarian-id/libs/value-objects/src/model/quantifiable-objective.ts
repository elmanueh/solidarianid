import { Either, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

interface QuantifiableObjectiveProps {
  quantity: number;
  unit: string;
}

export class QuantifiableObjective extends ValueObject<QuantifiableObjectiveProps> {
  get quantity(): number {
    return this.props.quantity;
  }

  get unit(): string {
    return this.props.unit;
  }

  private constructor(props: QuantifiableObjectiveProps) {
    super(props);
  }

  public static create(quantity: number, unit: string): Either<ValidationError, QuantifiableObjective> {
    if (quantity < 0) {
      throw new Error('Quantity must be a non-negative number.');
    }

    if (!unit || unit.trim() === '') {
      throw new Error('Unit must be a non-empty string.');
    }

    const objective = new QuantifiableObjective({ quantity, unit });
    return right(objective);
  }
}
