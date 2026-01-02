interface EitherProps<L, A> {
  value: L | A;
  isLeft(): boolean;
  isRight(): boolean;
}

export class Left<L, A> implements EitherProps<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> implements EitherProps<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export function left<L, A>(l: L): Either<L, A> {
  return new Left<L, A>(l);
}

export function right<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a);
}

export function sequence<L, R>(eithers?: Either<L, R>[]): Either<L, R[]> {
  const results: R[] = [];
  for (const either of eithers ?? []) {
    if (either.isLeft()) return left(either.value);
    results.push(either.value);
  }
  return right(results);
}
