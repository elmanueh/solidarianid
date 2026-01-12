import { Either, left } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RepositoryMongoose } from '@app/ddd/repository/repository-mongoose';
import { Injectable } from '@nestjs/common';
import { Administrator } from '@app/admin/administrator/model/domain/models/administrator';
import { AdministratorRepositoryPort } from 'apps/admin/src/administrator/model/domain/ports/output/administrator.repository.port';
import { AdministratorDocument, AdministratorEntity } from '../entities/administrator.entity';
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

  async findByEmail(email: string): Promise<Either<RepositoryException, Administrator>> {
    try {
      const document = await this.administratorModel.findOne({ email });
      if (!document) {
        return left(new EntityNotFoundException(`Administrator with email ${email} not found`, email));
      }

      return this.administratorEntityMapper.fromPersistence(document);
    } catch (error) {
      return left(new RepositoryException('Failed to find administrator by email.', error));
    }
  }
}
