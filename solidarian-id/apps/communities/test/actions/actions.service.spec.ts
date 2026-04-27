import { ActionsServiceImpl } from '@app/communities/application/services/actions.service.impl';
import { Action } from '@app/communities/domain/model/entities/action';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { ActionsRepositoryPort } from '@app/communities/domain/ports/actions.repository.port';
import { DomainEventBusPort } from '@app/communities/domain/ports/domain-event-bus.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Test, TestingModule } from '@nestjs/testing';
import { ActionRequestEventDto } from '@solidarianid/kafka';

describe('ActionsServiceImpl', () => {
  let service: ActionsServiceImpl;
  let mockActionRepository: {
    findAll: jest.Mock;
    findById: jest.Mock;
    save: jest.Mock;
  };
  let mockEventBus: { publish: jest.Mock };
  let mockUsersRepository: {
    findById: jest.Mock;
  };

  const validCauseId = 'c1b2c3d4-e5f6-4890-abcd-ef1234567003';
  const validActionId = 'd1b2c3d4-e5f6-4890-abcd-ef1234567004';
  const validUserId = 'a1b2c3d4-e5f6-4890-abcd-ef1234567001';

  const createValidActionDto = (): ActionRequestEventDto => ({
    id: validActionId,
    name: 'Test Action',
    description: 'A valid test action description with more than 20 characters',
    status: RequestStatus.APPROVED,
    userId: validUserId,
    causeId: validCauseId,
    objectives: [
      {
        name: 'Test Objective',
        description: 'A valid objective description with more than 20 characters',
        quantity: 100,
        unit: 'kilogramos',
      },
    ],
    events: [
      {
        name: 'Test Event',
        description: 'A valid event description with more than 20 characters',
        initialDate: new Date('2026-03-15T10:00:00.000Z'),
        place: {
          direction: 'Calle Mayor 123',
          city: 'Madrid',
          countryCode: 'ES',
        },
      },
    ],
    type: RequestType.ACTION,
  });

  const createMockAction = (): Action => {
    const actionOrError = Action.create(
      {
        name: 'Test Action',
        description: 'A valid test action description with more than 20 characters',
        objectives: [],
        events: [],
        causeId: validCauseId,
      },
      validActionId,
    );
    if (actionOrError.isLeft()) throw new Error('Failed to create mock action');
    return actionOrError.value;
  };

  beforeEach(async () => {
    mockActionRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };
    mockEventBus = { publish: jest.fn().mockResolvedValue(undefined) };
    mockUsersRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActionsServiceImpl,
        { provide: ActionsRepositoryPort, useValue: mockActionRepository },
        { provide: UsersRepositoryPort, useValue: mockUsersRepository },
        { provide: DomainEventBusPort, useValue: mockEventBus },
      ],
    }).compile();

    service = module.get<ActionsServiceImpl>(ActionsServiceImpl);
  });

  describe('create', () => {
    it('should create an action successfully without objectives and events', async () => {
      const dto = createValidActionDto();
      dto.objectives = [];
      dto.events = [];
      mockActionRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.create(dto);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(Action);
        expect(result.value.name).toBe(dto.name);
        expect(result.value.description).toBe(dto.description);
        expect(result.value.causeId).toBe(dto.causeId);
        expect(result.value.objectives).toHaveLength(0);
        expect(result.value.events).toHaveLength(0);
      }
      expect(mockActionRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should create an action with objectives successfully', async () => {
      const dto = createValidActionDto();
      dto.events = [];
      mockActionRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.create(dto);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value.objectives).toHaveLength(1);
        expect(result.value.objectives[0].name).toBe('Test Objective');
        expect(result.value.objectives[0].quantity).toBe(100);
        expect(result.value.objectives[0].unit).toBe('kilogramos');
      }
    });

    it('should create an action with events successfully', async () => {
      const dto = createValidActionDto();
      dto.objectives = [];
      mockActionRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.create(dto);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value.events).toHaveLength(1);
        expect(result.value.events[0].name).toBe('Test Event');
        expect(result.value.events[0].place.city).toBe('Madrid');
        expect(result.value.events[0].place.countryCode).toBe('ES');
      }
    });

    it('should create an action with both objectives and events successfully', async () => {
      const dto = createValidActionDto();
      mockActionRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.create(dto);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value.objectives).toHaveLength(1);
        expect(result.value.events).toHaveLength(1);
      }
      expect(mockActionRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return ValidationError when action name is invalid', async () => {
      const dto = createValidActionDto();
      dto.name = 'ab'; // Too short

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockActionRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when action description is invalid', async () => {
      const dto = createValidActionDto();
      dto.description = 'short'; // Too short

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockActionRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when objective name is invalid', async () => {
      const dto = createValidActionDto();
      dto.objectives[0].name = 'ab'; // Too short

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockActionRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when objective quantity is invalid', async () => {
      const dto = createValidActionDto();
      dto.objectives[0].quantity = -1; // Negative quantity

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockActionRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when event name is invalid', async () => {
      const dto = createValidActionDto();
      dto.objectives = [];
      dto.events[0].name = 'ab'; // Too short

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockActionRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when event place is invalid', async () => {
      const dto = createValidActionDto();
      dto.objectives = [];
      dto.events[0].place.city = ''; // Empty city

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockActionRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      const dto = createValidActionDto();
      const repoError = new RepositoryException('Database error');
      mockActionRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
    });
  });

  describe('getActions', () => {
    it('should return empty array when repository returns []', async () => {
      mockActionRepository.findAll.mockResolvedValueOnce(right([]));

      const result = await service.getActions();

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual([]);
      }
      expect(mockActionRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return actions when repository returns data', async () => {
      const mockActions = [createMockAction()];
      mockActionRepository.findAll.mockResolvedValueOnce(right(mockActions));

      const result = await service.getActions();

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0]).toBeInstanceOf(Action);
      }
      expect(mockActionRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should propagate ValidationError from repository', async () => {
      const err = new ValidationError('Invalid repository data');
      mockActionRepository.findAll.mockResolvedValueOnce(left(err));

      const result = await service.getActions();

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(err);
      expect(mockActionRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getActionById', () => {
    it('should return action when repository returns data', async () => {
      const mockAction = createMockAction();
      mockActionRepository.findById.mockResolvedValueOnce(right(mockAction));

      const result = await service.getActionById(validActionId);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(Action);
        expect(result.value.id.value).toBe(validActionId);
      }
      expect(mockActionRepository.findById).toHaveBeenCalledWith(validActionId, [
        'events',
        'events.assistants',
        'objectives',
      ]);
    });

    it('should propagate ValidationError from repository', async () => {
      const err = new ValidationError('Action not found');
      mockActionRepository.findById.mockResolvedValueOnce(left(err));

      const result = await service.getActionById(validActionId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(err);
      expect(mockActionRepository.findById).toHaveBeenCalledWith(validActionId, [
        'events',
        'events.assistants',
        'objectives',
      ]);
    });

    it('should request events and objectives relations when fetching by id', async () => {
      const mockAction = createMockAction();
      mockActionRepository.findById.mockResolvedValueOnce(right(mockAction));

      await service.getActionById(validActionId);

      expect(mockActionRepository.findById).toHaveBeenCalledWith(validActionId, [
        'events',
        'events.assistants',
        'objectives',
      ]);
    });
  });
});
