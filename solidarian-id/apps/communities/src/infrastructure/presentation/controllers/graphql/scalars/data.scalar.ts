import { InvalidDateError } from '@app/value-objects/errors/validation/date-validation-error';
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number | string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number | string): Date {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new InvalidDateError('Date must be a valid timestamp integer or ISO date string.');
    }

    return date;
  }

  serialize(value: Date): number {
    return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      const timestamp = Number(ast.value);

      if (!Number.isFinite(timestamp)) {
        throw new InvalidDateError('Date must be a valid timestamp integer or ISO date string.');
      }

      const date = new Date(timestamp);

      if (Number.isNaN(date.getTime())) {
        throw new InvalidDateError('Date must be a valid timestamp integer or ISO date string.');
      }

      return date;
    }

    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);

      if (Number.isNaN(date.getTime())) {
        throw new InvalidDateError('Date must be a valid timestamp integer or ISO date string.');
      }

      return date;
    }

    throw new InvalidDateError('Date must be an integer timestamp or ISO date string.');
  }
}
