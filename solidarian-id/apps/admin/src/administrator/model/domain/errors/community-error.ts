import { DomainError } from '@app/ddd/errors/domain-error';

export class CommunityError extends DomainError {
  constructor(message: string, communityId?: string) {
    const communityInfo = communityId ? ` for community ID ${communityId}` : '';
    super(`Community error${communityInfo}: ${message}`);
    this.name = CommunityError.name;
  }
}
