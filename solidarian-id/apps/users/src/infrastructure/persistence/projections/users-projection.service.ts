import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { UserCreatedEvent } from '@app/users/domain/events/user-created.event';
import { UserMobilePhoneUpdatedEvent } from '@app/users/domain/events/user-mobile-phone-updated.event';
import { UserUsernameUpdatedEvent } from '@app/users/domain/events/user-username-updated.event';
import { CheckpointProjectionEntity } from '@app/users/infrastructure/persistence/projections/checkpoint.projection.entity';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';
import { CheckpointsProjectionRepository } from '@app/users/infrastructure/persistence/repositories/checkpoints.projection.repository';
import { UsersProjectionRepository } from '@app/users/infrastructure/persistence/repositories/users.projection.repository';
import { AllStreamResolvedEvent, KurrentDBClient, Position, START, streamNameFilter } from '@kurrent/kurrentdb-client';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsersProjectionService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UsersProjectionService.name);
  private subscription?: ReturnType<KurrentDBClient['subscribeToAll']>;
  private running = false;
  private readonly PROJECTION_NAME = 'users-index';
  private readonly USER_STREAM_FILTER = streamNameFilter({ prefixes: ['user-'] });

  constructor(
    @Inject('EVENT_STORE') private readonly eventStore: KurrentDBClient,
    private readonly checkpointsRepository: CheckpointsProjectionRepository,
    private readonly usersRepository: UsersProjectionRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    if (this.running) return;
    this.running = true;

    try {
      const position = await this.loadCheckpoint();
      this.subscription = this.eventStore.subscribeToAll({
        fromPosition: position ?? START,
        filter: this.USER_STREAM_FILTER,
      });

      void this.consume();
      this.logger.log(`Users projection subscribed from ${position ? position.commit : START}`);
    } catch (error) {
      this.running = false;
      this.logger.error(`Failed to start users projection: ${error}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.running = false;
    await this.subscription?.unsubscribe();
  }

  private async loadCheckpoint(): Promise<Position | null> {
    const checkpointOrError = await this.checkpointsRepository.findOne({ projectionName: this.PROJECTION_NAME });

    if (checkpointOrError.isLeft()) {
      if (checkpointOrError.value instanceof EntityNotFoundException) return null;
      throw checkpointOrError.value;
    }

    const checkpoint = checkpointOrError.value;

    const position: Position = {
      commit: BigInt(checkpoint.commitPosition),
      prepare: BigInt(checkpoint.preparePosition),
    };

    return position;
  }

  private async consume(): Promise<void> {
    if (!this.subscription) return;

    try {
      for await (const resolvedEvent of this.subscription) {
        if (!this.running) break;
        await this.handleResolvedEvent(resolvedEvent);
      }
    } catch (error) {
      this.logger.error(`Users projection stopped unexpectedly: ${error}`);
    }
  }

  private async handleResolvedEvent(resolvedEvent: AllStreamResolvedEvent): Promise<void> {
    const position =
      resolvedEvent.event?.position ??
      (typeof resolvedEvent.commitPosition === 'bigint'
        ? { commit: resolvedEvent.commitPosition, prepare: resolvedEvent.commitPosition }
        : undefined);

    if (!position) return;

    const event = resolvedEvent.event;
    if (!event) {
      const checkpointResult = await this.checkpointsRepository.save(
        Object.assign(new CheckpointProjectionEntity(), {
          projectionName: this.PROJECTION_NAME,
          commitPosition: position.commit.toString(),
          preparePosition: position.prepare.toString(),
          updatedAt: new Date(),
        }),
      );

      if (checkpointResult.isLeft()) {
        throw checkpointResult.value;
      }

      return;
    }

    const projection = this.mapProjectionFromEvent(event.type, event.data as Record<string, unknown>);
    if (!projection) {
      const checkpointResult = await this.checkpointsRepository.save(
        Object.assign(new CheckpointProjectionEntity(), {
          projectionName: this.PROJECTION_NAME,
          commitPosition: position.commit.toString(),
          preparePosition: position.prepare.toString(),
          updatedAt: new Date(),
        }),
      );

      if (checkpointResult.isLeft()) {
        throw checkpointResult.value;
      }

      return;
    }

    const currentProjectionResult = await this.usersRepository.findOne({ id: projection.id! });
    if (currentProjectionResult.isLeft() && !(currentProjectionResult.value instanceof EntityNotFoundException)) {
      throw currentProjectionResult.value;
    }

    const currentProjection = currentProjectionResult.isRight() ? currentProjectionResult.value : null;
    const mergedProjection = Object.assign(new UserProjectionEntity(), {
      id: projection.id!,
      username: projection.username ?? currentProjection?.username,
      mobilePhone: projection.mobilePhone ?? currentProjection?.mobilePhone,
    });

    if (!mergedProjection.username || !mergedProjection.mobilePhone) {
      throw new Error(`Incomplete user projection payload for user ${projection.id!}`);
    }

    const projectionResult = await this.usersRepository.save(mergedProjection);
    if (projectionResult.isLeft()) {
      throw projectionResult.value;
    }

    const checkpointResult = await this.checkpointsRepository.save(
      Object.assign(new CheckpointProjectionEntity(), {
        projectionName: this.PROJECTION_NAME,
        commitPosition: position.commit.toString(),
        preparePosition: position.prepare.toString(),
        updatedAt: new Date(),
      }),
    );

    if (checkpointResult.isLeft()) {
      throw checkpointResult.value;
    }
  }

  private mapProjectionFromEvent(
    eventType: string,
    payload: Record<string, unknown>,
  ): Partial<UserProjectionEntity> | null {
    const mapper = {
      [UserCreatedEvent.name]: () => {
        return {
          id: payload.id as string,
          username: payload.username as string,
          mobilePhone: payload.mobilePhone as string,
        };
      },
      [UserUsernameUpdatedEvent.name]: () => {
        return {
          id: payload.id as string,
          username: payload.username as string,
        };
      },
      [UserMobilePhoneUpdatedEvent.name]: () => {
        return {
          id: payload.id as string,
          mobilePhone: payload.mobilePhone as string,
        };
      },
    }[eventType];

    return mapper ? mapper() : null;
  }
}
