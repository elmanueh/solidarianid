import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

interface AccessTokenPayload {
  sub: string;
  jti?: string;
}

type JwtRequest = Request & {
  cookies?: {
    AccessToken?: string;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const publicKey = Buffer.from(configService.get<string>('JWT_PUBLIC_KEY_BASE64') ?? '', 'base64').toString('utf8');

    if (!publicKey) {
      throw new Error('JWT public key is required to validate access tokens');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: JwtRequest) => request?.cookies?.AccessToken ?? null,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKey: publicKey,
    });
  }

  validate(payload: AccessTokenPayload): AccessTokenPayload {
    if (!payload?.sub) {
      throw new UnauthorizedException('Invalid access token payload');
    }

    return {
      sub: payload.sub,
      jti: payload.jti,
    };
  }
}
