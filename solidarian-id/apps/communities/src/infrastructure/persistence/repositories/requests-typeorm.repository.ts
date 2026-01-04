import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RequestEntity } from '../entities/request.entity';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { RequestEntityMapper } from '../mappers/request-entity.mapper';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { Request, RequestProps } from '@app/communities/domain/model/entities/request';

/**
 * TypeORM adapter implementation for the RequestsRepositoryPort.
 *
 * This adapter provides persistence operations for requests using TypeORM
 * and follows the Single Table Inheritance pattern where all request types share
 * the same database table distinguished by a type discriminator.
 */
@Injectable()
export class RequestsRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<Request<RequestProps>, RequestEntity>
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
   * Finds a request by its unique identifier and type.
   */
  async findByIdAndType(id: string, type: RequestType): Promise<Either<RepositoryException, Request<RequestProps>>> {
    try {
      const entity = await this.requestRepository.findOne({
        where: { id, type },
        relations: ['user'],
      });

      if (!entity) {
        return left(new EntityNotFoundException('Request', id));
      }

      const domainOrError = this.requestMapper.fromPersistence(entity);

      if (domainOrError.isLeft()) {
        return left(new RepositoryException(`Failed to map Request: ${domainOrError.value.message}`));
      }

      return right(domainOrError.value);
    } catch (error) {
      return left(new RepositoryException(`Failed to find Request by id ${id} and type ${type}`, error));
    }
  }

  /**
   * Finds all requests of a specific type.
   */
  async findByType(type: RequestType): Promise<Either<RepositoryException, Request<RequestProps>[]>> {
    try {
      const entities = await this.requestRepository.find({
        where: { type },
        relations: ['user'],
      });

      const results: Request<RequestProps>[] = [];

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
  async findPendingRequestsByType(type: RequestType): Promise<Either<RepositoryException, Request<RequestProps>[]>> {
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

      const results: Request<RequestProps>[] = [];

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
  async findByUserId(userId: string): Promise<Either<RepositoryException, Request<RequestProps>[]>> {
    try {
      const entities = await this.requestRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
        order: {
          id: 'DESC',
        },
      });

      const results: Request<RequestProps>[] = [];

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
  async findByUserIdAndType(
    userId: string,
    type: RequestType,
  ): Promise<Either<RepositoryException, Request<RequestProps>[]>> {
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

      const results: Request<RequestProps>[] = [];

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
