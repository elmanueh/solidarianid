import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidDurationDaysError } from '@app/value-objects/errors/validation/duration-days-validation-error';

export interface DurationDaysProps {
  value: number;
}

export class DurationDays extends ValueObject<DurationDaysProps> {
  private constructor(durationDays: number) {
    super({ value: durationDays });
  }

  get value(): number {
    return this.props.value;
  }

  public equals(other: DurationDays): boolean {
    return this.value === other.value;
  }

  public static create(
    durationDays: number,
  ): Either<InvalidDurationDaysError, DurationDays> {
    if (!Number.isInteger(durationDays) || durationDays <= 0) {
      return left(
        new InvalidDurationDaysError(
          'Duration days must be a positive integer.',
        ),
      );
    }

    return right(new DurationDays(durationDays));
  }
}
