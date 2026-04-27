/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Subscription } from '@app/communities/domain/model/entities/subscription';
import { PushSubscriptionRepositoryPort } from '@app/communities/domain/ports/push-subscription.repository.port';
import { SubscriptionEntity } from '@app/communities/infrastructure/persistence/entities/subscription.entity';
import { SubscriptionMapper } from '@app/communities/infrastructure/persistence/mappers/subscription.mapper';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { sequence } from '../../../../../../libs/ddd/src/either';

@Injectable()
export class SubscriptionTypeOrmAdapter
  extends RepositoryTypeORM<Subscription, SubscriptionEntity>
  implements PushSubscriptionRepositoryPort
{
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: TypeOrmRepository<SubscriptionEntity>,
    private readonly subscriptionMapper: SubscriptionMapper,
  ) {
    super(subscriptionRepository, subscriptionMapper);
  }

  async deleteByEndpointAndUserId(endpoint: string, userId: string): Promise<Either<RepositoryException, void>> {
    try {
      await this.subscriptionRepository.delete({ endpoint, userId });
      return right(undefined);
    } catch (error: any) {
      return left(
        new RepositoryException(
          `Failed to delete Subscription with endpoint ${endpoint} and user ${userId}: ${error?.message}`,
        ),
      );
    }
  }

  async findByUserId(userId: string): Promise<Either<RepositoryException | ValidationError, Subscription[]>> {
    try {
      const subscriptionEntities = await this.subscriptionRepository.find({ where: { userId } });
      const subscriptions = sequence(
        subscriptionEntities.map(entity => this.subscriptionMapper.fromPersistence(entity)),
      );
      if (subscriptions.isLeft()) {
        return left(subscriptions.value);
      }
      return right(subscriptions.value);
    } catch (error: any) {
      return left(new RepositoryException(`Failed to find Subscriptions for user ${userId}: ${error?.message}`));
    }
  }

  async findByCommunityId(communityId: string): Promise<Either<RepositoryException | ValidationError, Subscription[]>> {
    try {
      const subscriptionEntities = await this.subscriptionRepository
        .createQueryBuilder('subscription')
        .where(':communityId = ANY(subscription.communityFollowedIds)', { communityId })
        .getMany();

      const subscriptions = sequence(
        subscriptionEntities.map(entity => this.subscriptionMapper.fromPersistence(entity)),
      );

      if (subscriptions.isLeft()) {
        return left(subscriptions.value);
      }

      return right(subscriptions.value);
    } catch (error: any) {
      return left(
        new RepositoryException(`Failed to find Subscriptions for community ${communityId}: ${error?.message}`),
      );
    }
  }

  async findByCauseId(causeId: string): Promise<Either<RepositoryException | ValidationError, Subscription[]>> {
    try {
      const subscriptionEntities = await this.subscriptionRepository
        .createQueryBuilder('subscription')
        .where(':causeId = ANY(subscription.causeFollowedIds)', { causeId })
        .getMany();

      const subscriptions = sequence(
        subscriptionEntities.map(entity => this.subscriptionMapper.fromPersistence(entity)),
      );

      if (subscriptions.isLeft()) {
        return left(subscriptions.value);
      }

      return right(subscriptions.value);
    } catch (error: any) {
      return left(new RepositoryException(`Failed to find Subscriptions for cause ${causeId}: ${error?.message}`));
    }
  }
}
