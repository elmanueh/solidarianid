import { Either } from '@app/ddd/either';

export abstract class UsersServicePort {
  abstract registerUser(
    command: RegisterUserCommand,
  ): Promise<Either<EvalError, string>>;
}

export interface RegisterUserCommand {
  username: string;
  mobilePhone: string;
  password: string;
  city: string;
  countryCode: string;
}
