import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidDurationError } from '@app/value-objects/errors/validation/duration-validation.error';

export interface DurationRangeProps {
  startDate: Date;
  endDate: Date;
}

export class DurationRange extends ValueObject<DurationRangeProps> {
  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date {
    return this.props.endDate;
  }

  public isActive(): boolean {
    const now = new Date();
    return now >= this.startDate && now <= this.endDate;
  }

  public durationInDays(): number {
    const diffMs = this.endDate.getTime() - this.startDate.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  private constructor(props: DurationRangeProps) {
    super(props);
  }

  public static create(
    startDate: Date,
    endDate: Date,
  ): Either<InvalidDurationError, DurationRange> {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (startDate < now) {
      return left(new InvalidDurationError('Start date cannot be in the past'));
    }

    if (endDate <= startDate) {
      return left(
        new InvalidDurationError('End date must be after start date'),
      );
    }

    return right(new DurationRange({ startDate, endDate }));
  }
}
