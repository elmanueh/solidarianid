import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidQuantityError } from '@app/value-objects/errors/validation/quantity-validation-error';

export interface CurrentAmountProps {
  value: number;
}

export class CurrentAmount extends ValueObject<CurrentAmountProps> {
  private constructor(currentAmount: number) {
    super({ value: currentAmount });
  }

  get value(): number {
    return this.props.value;
  }

  public equals(other: CurrentAmount): boolean {
    return this.value === other.value;
  }

  public static create(currentAmount: number): Either<InvalidQuantityError, CurrentAmount> {
    if (currentAmount < 0) {
      return left(new InvalidQuantityError('Current amount cannot be less than zero.'));
    }

    return right(new CurrentAmount(currentAmount));
  }
}
