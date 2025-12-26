import { Either } from '@app/ddd/either';

export abstract class UsersService {
  abstract registerUser(
    command: RegisterUserCommand,
  ): Promise<Either<Error, string>>;
}

export interface RegisterUserCommand {
  username: string;
  mobilePhone: string;
  password: string;
  city: string;
  countryCode: string;
}
