import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RepositoryMongoose } from '@app/ddd/repository/repository-mongoose';
import { Injectable } from '@nestjs/common';
import { Administrator } from 'apps/admin/src/administrator/model/domain/model/administrator';
import { AdministratorRepositoryPort } from 'apps/admin/src/administrator/model/domain/ports/output/administrator.repository.port';
import {
  AdministratorDocument,
  AdministratorEntity,
} from '../entities/administrator.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AdministratorEntityMapper } from '../mapper/administrator.entity.mapper';
import { Model } from 'mongoose';

@Injectable()
export class AdministratorRepositoryAdapter
  extends RepositoryMongoose<Administrator, AdministratorEntity>
  implements AdministratorRepositoryPort
{
  constructor(
    @InjectModel(AdministratorEntity.name)
    private readonly administratorModel: Model<AdministratorDocument>,
    private readonly administratorEntityMapper: AdministratorEntityMapper,
  ) {
    super(administratorModel, administratorEntityMapper);
  }

  async findByEmail(
    email: string,
  ): Promise<Either<RepositoryException, Administrator>> {
    try {
      const document = await this.administratorModel.findOne({ email });
      if (!document) {
        return left(
          new EntityNotFoundException(
            `Administrator with email ${email} not found`,
            email,
          ),
        );
      }

      const model = this.administratorEntityMapper.fromPersistence(document);
      if (model.isLeft()) {
        return left(
          new RepositoryException('Failed to map entity from persistence.'),
        );
      }
      return right(model.value);
    } catch (error) {
      return left(
        new RepositoryException(
          'Failed to find administrator by email.',
          error,
        ),
      );
    }
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<Either<RepositoryException, Administrator>> {
    try {
      const document = await this.administratorModel.findOne({
        email,
        password,
      });
      if (!document) {
        return left(
          new EntityNotFoundException(
            'Administrator with provided credentials not found',
            email,
          ),
        );
      }

      const model = this.administratorEntityMapper.fromPersistence(document);
      if (model.isLeft()) {
        return left(
          new RepositoryException('Failed to map entity from persistence.'),
        );
      }
      return right(model.value);
    } catch (error) {
      return left(
        new RepositoryException(
          'Failed to find administrator by credentials.',
          error,
        ),
      );
    }
  }
}
