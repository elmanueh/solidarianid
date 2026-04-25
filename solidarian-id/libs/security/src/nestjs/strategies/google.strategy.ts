import { UserService } from '@app/communities/domain/services/user.service';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { AuthService } from '@app/users/domain/services/auth.service';
import { RegisterUserCommand, UsersService } from '@app/users/domain/services/users.service';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { randomInt, randomUUID } from 'node:crypto';
import { AuthenticateOptionsGoogle, Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('OAUTH_GOOGLE_CLIENT_ID') ?? '',
      clientSecret: configService.get<string>('OAUTH_GOOGLE_CLIENT_SECRET') ?? '',
      callbackURL: configService.get<string>('OAUTH_GOOGLE_CALLBACK_URI') ?? '',
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    const emailUser = profile.emails?.[0]?.value;
    const firstName = profile.name?.givenName;
    const lastName = profile.name?.familyName;

    const username = emailUser?.split('@')[0] || `googleuser${profile.id}`;
    const fullName = `${firstName} ${lastName}`;
    const password = `Oauth2-${username}-${profile.id.slice(0, 4)}-${randomUUID().slice(0, 4)}_?`;

    const getOrRegisterUserCommand: RegisterUserCommand = {
      fullName,
      username,
      password,
      mobilePhone: `+34${randomInt(600000000, 699999999)}`,
      city: 'GoogleCity',
      countryCode: 'GO',
    };

    const userOrError = await this.userService.getOrRegisterUserIfNotExists(getOrRegisterUserCommand);

    if (userOrError.isLeft()) {
      return done(userOrError.value, false);
    }

    return done(null, userOrError.value);
  }
}
