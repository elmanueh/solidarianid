import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidDurationDaysError } from '@app/value-objects/errors/validation/duration-days-validation-error';

export interface DurationProps {
  value: number;
}

export class Duration extends ValueObject<DurationProps> {
  private constructor(durationDays: number) {
    super({ value: durationDays });
  }

  get value(): number {
    return this.props.value;
  }

  public equals(other: Duration): boolean {
    return this.value === other.value;
  }

  public static create(
    durationDays: number,
  ): Either<InvalidDurationDaysError, Duration> {
    if (!Number.isInteger(durationDays) || durationDays <= 0) {
      return left(
        new InvalidDurationDaysError(
          'Duration days must be a positive integer.',
        ),
      );
    }

    return right(new Duration(durationDays));
  }
}
