import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidQuantityError } from '@app/value-objects/errors/validation/quantity-validation-error';

export interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  private constructor(quantity: number) {
    super({ value: quantity });
  }

  get value(): number {
    return this.props.value;
  }

  public equals(other: Quantity): boolean {
    return this.value === other.value;
  }

  public static create(
    quantity: number,
  ): Either<InvalidQuantityError, Quantity> {
    if (quantity <= 0) {
      return left(
        new InvalidQuantityError(
          'Quantity cannot be less than or equal to zero.',
        ),
      );
    }

    return right(new Quantity(quantity));
  }
}
