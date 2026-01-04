import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunitiesServiceImpl implements CommunitiesService {
  constructor(private readonly communityRepository: CommunitiesRepositoryPort) {}

  async getCommunities(): Promise<Either<ValidationError, Community[]>> {
    return await this.communityRepository.findAll();
  }

  async getCommunityById(id: string): Promise<Either<ValidationError, Community>> {
    return await this.communityRepository.findById(id, ['causes']);
  }
}
