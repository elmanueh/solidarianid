export abstract class UserServicePort {
  abstract registerUser(command: RegisterUserCommand): Promise<string>;
}

export interface RegisterUserCommand {
  username: string;
  mobilePhone: string;
  password: string;
  city: string;
  countryCode: string;
}
