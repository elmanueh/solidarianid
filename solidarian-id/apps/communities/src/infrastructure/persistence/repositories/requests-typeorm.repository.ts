import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RequestEntity } from '../entities/request.entity';
import { AnyRequest, RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { RequestEntityMapper } from '../mappers/request-entity.mapper';
import { CommunityRequest } from '@app/communities/domain/model/entities/request-community';
import { CauseRequest } from '@app/communities/domain/model/entities/request-cause';
import { ActionRequest } from '@app/communities/domain/model/entities/request-action';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';

/**
 * TypeORM adapter implementation for the RequestsRepositoryPort.
 *
 * This adapter provides persistence operations for all request types using TypeORM
 * and follows the Single Table Inheritance pattern where all request types share
 * the same database table distinguished by a type discriminator.
 *
 * The adapter extends the base RepositoryTypeORM class to inherit common CRUD operations
 * and implements specific methods for type-safe request retrieval.
 */
@Injectable()
export class RequestsRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<AnyRequest, RequestEntity>
  implements RequestsRepositoryPort
{
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: TypeOrmRepository<RequestEntity>,
    private readonly requestMapper: RequestEntityMapper,
  ) {
    super(requestRepository, requestMapper);
  }

  /**
   * Finds a community request by its unique identifier.
   */
  async findCommunityRequestById(id: string): Promise<Either<RepositoryException, CommunityRequest>> {
    try {
      const entity = await this.requestRepository.findOne({
        where: { id, type: RequestType.COMMUNITY },
        relations: ['user'],
      });

      if (!entity) {
        return left(new EntityNotFoundException('CommunityRequest', id));
      }

      const domainOrError = this.requestMapper.fromPersistence(entity);

      if (domainOrError.isLeft()) {
        return left(new RepositoryException(`Failed to map CommunityRequest: ${domainOrError.value.message}`));
      }

      const domain = domainOrError.value;

      if (!(domain instanceof CommunityRequest)) {
        return left(new RepositoryException(`Expected CommunityRequest but got ${domain.constructor.name}`));
      }

      return right(domain);
    } catch (error) {
      return left(new RepositoryException(`Failed to find CommunityRequest by id ${id}`, error));
    }
  }

  /**
   * Finds a cause request by its unique identifier.
   */
  async findCauseRequestById(id: string): Promise<Either<RepositoryException, CauseRequest>> {
    try {
      const entity = await this.requestRepository.findOne({
        where: { id, type: RequestType.CAUSE },
        relations: ['user'],
      });

      if (!entity) {
        return left(new EntityNotFoundException('CauseRequest', id));
      }

      const domainOrError = this.requestMapper.fromPersistence(entity);

      if (domainOrError.isLeft()) {
        return left(new RepositoryException(`Failed to map CauseRequest: ${domainOrError.value.message}`));
      }

      const domain = domainOrError.value;

      if (!(domain instanceof CauseRequest)) {
        return left(new RepositoryException(`Expected CauseRequest but got ${domain.constructor.name}`));
      }

      return right(domain);
    } catch (error) {
      return left(new RepositoryException(`Failed to find CauseRequest by id ${id}`, error));
    }
  }

  /**
   * Finds an action request by its unique identifier.
   */
  async findActionRequestById(id: string): Promise<Either<RepositoryException, ActionRequest>> {
    try {
      const entity = await this.requestRepository.findOne({
        where: { id, type: RequestType.ACTION },
        relations: ['user'],
      });

      if (!entity) {
        return left(new EntityNotFoundException('ActionRequest', id));
      }

      const domainOrError = this.requestMapper.fromPersistence(entity);

      if (domainOrError.isLeft()) {
        return left(new RepositoryException(`Failed to map ActionRequest: ${domainOrError.value.message}`));
      }

      const domain = domainOrError.value;

      if (!(domain instanceof ActionRequest)) {
        return left(new RepositoryException(`Expected ActionRequest but got ${domain.constructor.name}`));
      }

      return right(domain);
    } catch (error) {
      return left(new RepositoryException(`Failed to find ActionRequest by id ${id}`, error));
    }
  }

  /**
   * Finds all requests of a specific type.
   */
  async findByType(type: RequestType): Promise<Either<RepositoryException, AnyRequest[]>> {
    try {
      const entities = await this.requestRepository.find({
        where: { type },
        relations: ['user'],
      });

      const results: AnyRequest[] = [];

      for (const entity of entities) {
        const domainOrError = this.requestMapper.fromPersistence(entity);

        if (domainOrError.isLeft()) {
          return left(new RepositoryException(`Failed to map request: ${domainOrError.value.message}`));
        }

        results.push(domainOrError.value);
      }

      return right(results);
    } catch (error) {
      return left(new RepositoryException(`Failed to find requests by type ${type}`, error));
    }
  }

  /**
   * Finds all pending requests of a specific type.
   */
  async findPendingRequestsByType(type: RequestType): Promise<Either<RepositoryException, AnyRequest[]>> {
    try {
      const entities = await this.requestRepository.find({
        where: {
          type,
          status: RequestStatus.PENDING,
        },
        relations: ['user'],
        order: {
          id: 'DESC',
        },
      });

      const results: AnyRequest[] = [];

      for (const entity of entities) {
        const domainOrError = this.requestMapper.fromPersistence(entity);

        if (domainOrError.isLeft()) {
          return left(new RepositoryException(`Failed to map request: ${domainOrError.value.message}`));
        }

        results.push(domainOrError.value);
      }

      return right(results);
    } catch (error) {
      return left(new RepositoryException(`Failed to find pending requests by type ${type}`, error));
    }
  }

  /**
   * Finds all requests created by a specific user.
   */
  async findByUserId(userId: string): Promise<Either<RepositoryException, AnyRequest[]>> {
    try {
      const entities = await this.requestRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
        order: {
          id: 'DESC',
        },
      });

      const results: AnyRequest[] = [];

      for (const entity of entities) {
        const domainOrError = this.requestMapper.fromPersistence(entity);

        if (domainOrError.isLeft()) {
          return left(new RepositoryException(`Failed to map request: ${domainOrError.value.message}`));
        }

        results.push(domainOrError.value);
      }

      return right(results);
    } catch (error) {
      return left(new RepositoryException(`Failed to find requests by user id ${userId}`, error));
    }
  }

  /**
   * Finds all requests created by a specific user filtered by type.
   */
  async findByUserIdAndType(userId: string, type: RequestType): Promise<Either<RepositoryException, AnyRequest[]>> {
    try {
      const entities = await this.requestRepository.find({
        where: {
          user: { id: userId },
          type,
        },
        relations: ['user'],
        order: {
          id: 'DESC',
        },
      });

      const results: AnyRequest[] = [];

      for (const entity of entities) {
        const domainOrError = this.requestMapper.fromPersistence(entity);

        if (domainOrError.isLeft()) {
          return left(new RepositoryException(`Failed to map request: ${domainOrError.value.message}`));
        }

        results.push(domainOrError.value);
      }

      return right(results);
    } catch (error) {
      return left(new RepositoryException(`Failed to find requests by user id ${userId} and type ${type}`, error));
    }
  }
}
