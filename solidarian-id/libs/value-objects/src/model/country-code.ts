import { ValueObject } from '@app/ddd/value-object';
import { Either, right } from '@app/ddd/either';
import { InvalidCountryCodeError } from '@app/value-objects/errors/validation/country-code-validation-error';

export interface CountryCodeProps {
  value: string;
}

export class CountryCode extends ValueObject<CountryCodeProps> {
  private constructor(plainCode: string) {
    super({ value: plainCode });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: CountryCode): boolean {
    return this.value === other.value;
  }

  public static create(
    plainCode: string,
  ): Either<InvalidCountryCodeError, CountryCode> {
    return right(new CountryCode(plainCode));
  }
}
