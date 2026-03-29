import { AggregateRoot } from '@app/ddd/aggregate-root';
import { DomainEvent } from '@app/ddd/domain-event';
import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { jsonEvent, KurrentDBClient } from '@kurrent/kurrentdb-client';
import { Inject } from '@nestjs/common';

export class RepositoryKurrentDb<TDomain extends AggregateRoot<any>> extends Repository<TDomain> {
  constructor(@Inject('EVENT_STORE') protected readonly eventStore: KurrentDBClient) {
    super();
  }

  protected streamName(modelId: string): string {
    return `model-${modelId}`;
  }

  private async addEvent(event: DomainEvent): Promise<void> {
    const stream = this.streamName(event.id);
    const kurrentEvent = jsonEvent({
      type: event.type,
      data: { ...event },
    });

    await this.eventStore.appendToStream(stream, kurrentEvent);
  }

  async save(model: TDomain): Promise<Either<RepositoryException, void>> {
    try {
      const events = model.getDomainEvents();

      for (const event of events) {
        await this.addEvent(event);
      }

      return right(undefined);
    } catch (error) {
      return left(new RepositoryException('Failed to save entity.', error));
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async findById(id: string): Promise<Either<RepositoryException | EntityNotFoundException, TDomain>> {
    return left(new RepositoryException('Find by ID operation need to be implemented in the specific repository.'));
  }

  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async remove(id: string): Promise<Either<RepositoryException, void>> {
    return left(new RepositoryException('Remove operation is not supported in KurrentDB repository.'));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findAll(): Promise<Either<RepositoryException | EntityNotFoundException, TDomain[]>> {
    return left(new RepositoryException('Find all operation is not supported in KurrentDB repository.'));
  }
}
