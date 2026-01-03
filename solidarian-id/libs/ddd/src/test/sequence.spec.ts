import { ValidationError } from '../../../value-objects/src/errors/validation/validation-error';
import { right, left, sequence } from '../either';

describe('sequence', () => {
  // Condition eithersArray == undefined (bucle does not run)
  it('should return Right when eithers array is undefined', () => {
    const result = sequence<number, string>(undefined);
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toEqual([]);
    }
  });

  // COndition eithersArray == 0 (bucle does not run)
  it('should return Right with empty array when eithers array is empty', () => {
    const result = sequence<ValidationError, string>([]);
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toEqual([]);
    }
  });

  // Condition eithersArray == 1 (bucles runs once)
  it('should return Right when eithers array has one Right', () => {
    const rightEither = right<ValidationError, string>('success');
    const result = sequence<ValidationError, string>([rightEither]);
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toEqual(['success']);
    }
  });

  // Condition eithersArray == 2 (bucle runs twice)
  it('should return Left when you have 2 items and the last one is Left', () => {
    const rightEither = right<ValidationError, string>('success');
    const leftEither = left<ValidationError, string>(new ValidationError('Failure'));
    const result = sequence<ValidationError, string>([rightEither, leftEither]);
    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(ValidationError);
    }
  });

  // Condition: m passes, m < n (typical number), early exit before finishing
  it('should stop early (m < n passes) when a Left appears before the end', () => {
    // n = 6, m = 3 -> Left at index 2 => loop executes 3 iterations and returns
    const eithers = [
      right<ValidationError, string>('r1'),
      right<ValidationError, string>('r2'),
      left<ValidationError, string>(new ValidationError('Failure at m')),
      right<ValidationError, string>('r4'), // should never be read
      right<ValidationError, string>('r5'), // should never be read
      right<ValidationError, string>('r6'), // should never be read
    ];

    const result = sequence<ValidationError, string>(eithers);

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(result.value.message).toBe('Failure at m');
    }
  });

  // Condition: n-1 passes (Left in the penultimate position)
  it('should do n-1 passes when the penultimate element is Left', () => {
    // n = 5 -> Left at index 3 => loop runs 4 times (n-1) and returns
    const eithers = [
      right<ValidationError, string>('r1'),
      right<ValidationError, string>('r2'),
      right<ValidationError, string>('r3'),
      left<ValidationError, string>(new ValidationError('Failure at n-1')),
      right<ValidationError, string>('r5'), // should never be read
    ];

    const result = sequence<ValidationError, string>(eithers);

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(result.value.message).toBe('Failure at n-1');
    }
  });

  // Condition: n passes (all Rights, loop completes)
  it('should do n passes and return Right with all values when all elements are Right', () => {
    // n = 5 -> loop runs 5 times and completes
    const eithers = [
      right<ValidationError, string>('a'),
      right<ValidationError, string>('b'),
      right<ValidationError, string>('c'),
      right<ValidationError, string>('d'),
      right<ValidationError, string>('e'),
    ];

    const result = sequence<ValidationError, string>(eithers);

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toEqual(['a', 'b', 'c', 'd', 'e']);
    }
  });

  // Condition: n+1 passes -> NOT POSSIBLE with `for (i < length)`
  it('should document that n+1 passes are not possible (bounded by array length)', () => {
    // The loop condition is i < eithersArray.length, so it can run at most n times.
    expect(true).toBe(true);
  });
});
