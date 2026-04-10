import { AuthorizationMetadata } from '@solidarianid/security/core';
import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_METADATA_KEY = 'authorize';

export const Authorize = (metadata: AuthorizationMetadata) => SetMetadata(AUTHORIZE_METADATA_KEY, metadata);
