import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { ObjectivesRepositoryPort } from '@app/communities/shared/domain/ports/objectives.repository.port';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class ObjectivesRepositoryTypeOrmAdapter implements ObjectivesRepositoryPort {
  constructor(
    @InjectRepository(ObjetiveUserEntity)
    private readonly objectiveUserRepository: TypeOrmRepository<ObjetiveUserEntity>,
  ) {}

  async findAllObjectiveIdsByUserId(userId: string): Promise<Either<RepositoryException, string[]>> {
    try {
      const objectiveUsers = await this.objectiveUserRepository.find({
        where: { userId },
        select: {
          actionId: true,
          name: true,
        },
      });

      const objectiveIds = Array.from(
        new Set(objectiveUsers.map(objectiveUser => `${objectiveUser.actionId}:${objectiveUser.name}`)),
      );

      return right(objectiveIds);
    } catch (error) {
      return left(new RepositoryException(`Failed to find objectives by user id ${userId}.`, error));
    }
  }
}
