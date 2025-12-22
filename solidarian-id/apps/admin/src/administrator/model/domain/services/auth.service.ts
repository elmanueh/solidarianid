import { Either } from '@app/ddd/either';
import { AuthError } from '../errors/auth.error';
import { Administrator } from '../model/administrator';

export abstract class AuthService {
  public abstract register(
    fullname: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<Either<AuthError, void>>;

  public abstract login(
    email: string,
    password: string,
  ): Promise<Either<AuthError, Administrator>>;
}
