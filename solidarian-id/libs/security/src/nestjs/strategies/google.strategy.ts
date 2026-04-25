import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('OAUTH_GOOGLE_CLIENT_ID') ?? '',
      clientSecret: configService.get<string>('OAUTH_GOOGLE_CLIENT_SECRET') ?? '',
      callbackURL: configService.get<string>('OAUTH_GOOGLE_CALLBACK_URI') ?? '',
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log('Google profile:', profile);
  }
}
