import { Either, left, right, sequence } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Mapper } from '@app/ddd/repository/mapper';
import { Repository } from '@app/ddd/repository/repository';
import { HydratedDocument, Model } from 'mongoose';

export class RepositoryMongoose<TDomain extends Entity<any>, TPersistence> extends Repository<TDomain> {
  constructor(
    private readonly model: Model<HydratedDocument<TPersistence>>,
    private readonly mapper: Mapper<TDomain, TPersistence>,
  ) {
    super();
  }

  async save(model: TDomain): Promise<Either<RepositoryException, void>> {
    try {
      const document = new this.model(this.mapper.toPersistence(model));
      if (await this.model.findById(document._id).exec()) {
        document.isNew = false;
      }
      await document.save();
      return right(undefined);
    } catch (error) {
      return left(new RepositoryException('Failed to save entity.', error));
    }
  }

  async remove(id: string): Promise<Either<RepositoryException, void>> {
    try {
      const document = await this.model.findById(id).exec();
      if (!document) {
        return left(new EntityNotFoundException('Entity not found for removal.', id));
      }

      await this.model.findByIdAndDelete(id).exec();
      return right(undefined);
    } catch (error) {
      return left(new RepositoryException('Failed to remove entity.', error));
    }
  }

  async findById(id: string): Promise<Either<RepositoryException | EntityNotFoundException, TDomain>> {
    try {
      const document = await this.model.findById(id).exec();
      if (!document) {
        return left(new EntityNotFoundException(this.model.modelName, id));
      }

      return this.mapper.fromPersistence(document);
    } catch (error) {
      return left(new RepositoryException('Failed to find entity.', error));
    }
  }

  async findAll(): Promise<Either<RepositoryException | EntityNotFoundException, TDomain[]>> {
    try {
      const documents = await this.model.find().exec();
      if (documents.length === 0) {
        return left(new EntityNotFoundException('No entities found', 'all'));
      }

      return sequence(documents.map(document => this.mapper.fromPersistence(document)));
    } catch (error) {
      return left(new RepositoryException('Failed to find entities.', error));
    }
  }
}
