import { RequestsServiceImpl } from '@app/communities/application/services/requests.service.impl';
import { UserPermissionError } from '@app/communities/domain/errors/user-permission.error';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { Cause } from '@app/communities/domain/model/aggregates/cause';
import { ActionRequest } from '@app/communities/domain/model/entities/request-action';
import { CauseRequest } from '@app/communities/domain/model/entities/request-cause';
import { CommunityRequest } from '@app/communities/domain/model/entities/request-community';
import { User } from '@app/communities/domain/model/entities/user';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { PushSubscriptionRepositoryPort } from '@app/communities/domain/ports/push-subscription.repository.port';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { ActionsService } from '@app/communities/domain/services/actions.service';
import { CausesService } from '@app/communities/domain/services/causes.service';
import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { CreateActionRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-action.request.dto';
import { CreateCauseRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-cause.request.dto';
import { CreateCommunityRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-community.request.dto';
import { DomainEvents } from '@app/ddd/domain-events';
import { left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Test, TestingModule } from '@nestjs/testing';
import { ActionRequestEventDto, CauseRequestEventDto, CommunityRequestEventDto } from '@solidarianid/kafka';

describe('RequestsServiceImpl', () => {
  let service: RequestsServiceImpl;
  let mockRequestsRepository: {
    save: jest.Mock;
    findById: jest.Mock;
    findAll: jest.Mock;
    remove: jest.Mock;
  };
  let mockCommunityRepository: {
    findById: jest.Mock;
    save: jest.Mock;
    findAll: jest.Mock;
    remove: jest.Mock;
  };
  let mockCauseRepository: {
    findById: jest.Mock;
    save: jest.Mock;
    findAll: jest.Mock;
    remove: jest.Mock;
  };
  let mockEventBus: { publish: jest.Mock; dispatch: jest.Mock };
  let mockUsersRepository: {
    findById: jest.Mock;
    save: jest.Mock;
    findAll: jest.Mock;
    remove: jest.Mock;
  };
  let mockCommunitiesService: { create: jest.Mock };
  let mockCausesService: { create: jest.Mock };
  let mockActionsService: { create: jest.Mock };
  let mockSubscriptionsRepository: { findByUserId: jest.Mock; save: jest.Mock };

  const validUserId = 'a1b2c3d4-e5f6-4890-abcd-ef1234567001';
  const unauthorizedUserId = 'a1b2c3d4-e5f6-4890-abcd-ef1234567999';
  const validCommunityId = 'b1b2c3d4-e5f6-4890-abcd-ef1234567002';
  const validCauseId = 'c1b2c3d4-e5f6-4890-abcd-ef1234567003';
  const validRequestId = 'd1b2c3d4-e5f6-4890-abcd-ef1234567004';
  const validUser = User.create({ fullName: 'Juan Voluntario García' }, validUserId);
  const unauthorizedUser = User.create({ fullName: 'Usuario Sin Permisos' }, unauthorizedUserId);
  const validCommunity = Community.create(
    {
      name: 'Test Community',
      description: 'A valid community description for testing with more than 20 chars',
      creator: validUser.value as User,
    },
    validCommunityId,
  );
  const validCause = Cause.create(
    {
      name: 'Test Cause',
      description: 'A valid cause description for testing with more than 20 chars',
      ods: [SustainableDevelopmentGoal.NoPoverty],
      initialDate: new Date('2026-01-01'),
      durationDays: 90,
      communityId: validCommunityId,
    },
    validCauseId,
  );

  beforeEach(async () => {
    mockRequestsRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
    const eventBusMock = jest.fn();
    mockEventBus = { publish: eventBusMock, dispatch: eventBusMock };
    mockUsersRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
    mockCommunityRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
    mockCauseRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
    mockCommunitiesService = { create: jest.fn() };
    mockCausesService = { create: jest.fn() };
    mockActionsService = { create: jest.fn() };
    mockSubscriptionsRepository = {
      findByUserId: jest.fn().mockResolvedValue(right([])),
      save: jest.fn().mockResolvedValue(right(undefined)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsServiceImpl,
        { provide: RequestsRepositoryPort, useValue: mockRequestsRepository },
        { provide: DomainEvents, useValue: mockEventBus },
        { provide: UsersRepositoryPort, useValue: mockUsersRepository },
        { provide: CommunitiesRepositoryPort, useValue: mockCommunityRepository },
        { provide: CausesRepositoryPort, useValue: mockCauseRepository },
        { provide: CommunitiesService, useValue: mockCommunitiesService },
        { provide: CausesService, useValue: mockCausesService },
        { provide: ActionsService, useValue: mockActionsService },
        { provide: PushSubscriptionRepositoryPort, useValue: mockSubscriptionsRepository },
      ],
    }).compile();

    service = module.get<RequestsServiceImpl>(RequestsServiceImpl);
  });

  describe('createCommunityRequest', () => {
    const validCommunityDto: CreateCommunityRequestDto = {
      name: 'Comunidad de Prueba',
      description: 'Esta es una descripción válida para la comunidad de prueba con más de 20 caracteres',
      causeCreationRequests: [
        {
          name: 'Causa de Prueba',
          description: 'Descripción válida de la causa para pruebas con más de 20 caracteres',
          ods: [SustainableDevelopmentGoal.NoPoverty],
          initialDate: '2026-01-15T00:00:00.000Z',
          durationDays: 90,
        },
      ],
    };

    it('should create a community request successfully', async () => {
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockEventBus.publish.mockResolvedValueOnce(undefined);

      const result = await service.createCommunityRequest(validCommunityDto, validUserId);

      expect(result.isRight()).toBe(true);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(validUserId);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockEventBus.publish).toHaveBeenCalledTimes(1);
    });

    it('should return EntityNotFoundException when user does not exist', async () => {
      const notFoundError = new EntityNotFoundException('User', 'User not found');
      mockUsersRepository.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.createCommunityRequest(validCommunityDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(EntityNotFoundException);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
      expect(mockEventBus.publish).not.toHaveBeenCalled();
    });

    it('should return ValidationError when name is invalid', async () => {
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);

      const invalidDto: CreateCommunityRequestDto = {
        ...validCommunityDto,
        name: 'ab', // Demasiado corto
      };

      const result = await service.createCommunityRequest(invalidDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      const repoError = new RepositoryException('Database error');
      mockRequestsRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.createCommunityRequest(validCommunityDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
      expect(mockEventBus.publish).not.toHaveBeenCalled();
    });
  });

  describe('createCauseRequest', () => {
    const validCauseDto: CreateCauseRequestDto = {
      name: 'Causa Benéfica de Prueba',
      description: 'Esta es una descripción válida para la causa benéfica con más de 20 caracteres',
      communityId: validCommunityId,
      ods: [SustainableDevelopmentGoal.ZeroHunger],
      initialDate: '2026-02-01T00:00:00.000Z',
      durationDays: 180,
    };

    it('should create a cause request successfully', async () => {
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockEventBus.publish.mockResolvedValueOnce(undefined);

      const result = await service.createCauseRequest(validCauseDto, validUserId);

      expect(result.isRight()).toBe(true);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(validUserId);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockEventBus.publish).toHaveBeenCalledTimes(1);
    });

    it('should return EntityNotFoundException when user does not exist', async () => {
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      const notFoundError = new EntityNotFoundException('User', 'User not found');
      mockUsersRepository.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.createCauseRequest(validCauseDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(EntityNotFoundException);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when description is invalid', async () => {
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);

      const invalidDto: CreateCauseRequestDto = {
        ...validCauseDto,
        description: 'corta', // Demasiado corta
      };

      const result = await service.createCauseRequest(invalidDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      const repoError = new RepositoryException('Database error');
      mockRequestsRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.createCauseRequest(validCauseDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
      expect(mockEventBus.publish).not.toHaveBeenCalled();
    });

    it('should return UserPermissionError when user is not admin or creator', async () => {
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      mockUsersRepository.findById.mockResolvedValueOnce(unauthorizedUser);

      const dtoWithUnauthorizedUser: CreateCauseRequestDto = {
        ...validCauseDto,
      };

      const result = await service.createCauseRequest(dtoWithUnauthorizedUser, unauthorizedUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(UserPermissionError);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('createActionRequest', () => {
    const validActionDto: CreateActionRequestDto = {
      name: 'Acción Solidaria de Prueba',
      description: 'Esta es una descripción válida para la acción solidaria con más de 20 caracteres',
      causeId: validCauseId,
      objectives: [
        {
          name: 'Objetivo de Prueba',
          description: 'Descripción del objetivo cuantificable con más de 20 caracteres',
          quantity: 100,
          unit: 'kilogramos',
        },
      ],
      events: [
        {
          name: 'Evento de Prueba',
          description: 'Descripción del evento presencial con más de 20 caracteres',
          initialDate: '2026-03-15T10:00:00.000Z',
          place: {
            direction: 'Calle Mayor 123',
            city: 'Madrid',
            countryCode: 'ES',
          },
        },
      ],
    };

    it('should create an action request successfully', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockEventBus.publish.mockResolvedValueOnce(undefined);

      const result = await service.createActionRequest(validActionDto, validUserId);

      expect(result).toBeDefined();
      expect(result.isRight()).toBe(true);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(validUserId);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockEventBus.publish).toHaveBeenCalledTimes(1);
    });

    it('should return EntityNotFoundException when user does not exist', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      const notFoundError = new EntityNotFoundException('User', 'User not found');
      mockUsersRepository.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.createActionRequest(validActionDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(EntityNotFoundException);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when name is invalid', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));

      const invalidDto: CreateActionRequestDto = {
        ...validActionDto,
        name: 'ab', // Demasiado corto
      };

      const result = await service.createActionRequest(invalidDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      const repoError = new RepositoryException('Database error');
      mockRequestsRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.createActionRequest(validActionDto, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
      expect(mockEventBus.publish).not.toHaveBeenCalled();
    });

    it('should publish event after successful save', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockEventBus.publish.mockResolvedValueOnce(undefined);

      await service.createActionRequest(validActionDto, validUserId);

      expect(mockEventBus.publish).toHaveBeenCalledTimes(1);
      expect(mockEventBus.publish).toHaveBeenCalledWith([
        expect.objectContaining({
          type: 'RequestCreatedEvent',
          id: expect.any(String) as unknown as string,
        }) as unknown as object,
      ]);
    });

    it('should return UserPermissionError when user is not admin or creator of the community', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      mockUsersRepository.findById.mockResolvedValueOnce(unauthorizedUser);
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));

      const dtoWithUnauthorizedUser: CreateActionRequestDto = {
        ...validActionDto,
      };

      const result = await service.createActionRequest(dtoWithUnauthorizedUser, unauthorizedUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(UserPermissionError);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('acceptRequest', () => {
    const createMockCommunityRequest = () => {
      const request = CommunityRequest.create({
        name: 'Test Community Request',
        description: 'A valid description for the community request with more than 20 chars',
        status: RequestStatus.PENDING,
        type: RequestType.COMMUNITY,
        user: validUser.value as User,
        causeCreationRequests: [],
      });
      return request.value as CommunityRequest;
    };

    const createMockCauseRequest = () => {
      const request = CauseRequest.create({
        name: 'Test Cause Request',
        description: 'A valid description for the cause request with more than 20 chars',
        status: RequestStatus.PENDING,
        type: RequestType.CAUSE,
        user: validUser.value as User,
        ods: [SustainableDevelopmentGoal.NoPoverty],
        initialDate: new Date('2026-01-01'),
        durationDays: 90,
        communityId: validCommunityId,
      });
      return request.value as CauseRequest;
    };

    const createMockActionRequest = () => {
      const request = ActionRequest.create({
        name: 'Test Action Request',
        description: 'A valid description for the action request with more than 20 chars',
        status: RequestStatus.PENDING,
        type: RequestType.ACTION,
        user: validUser.value as User,
        objectives: [],
        events: [],
        causeId: validCauseId,
      });
      return request.value as ActionRequest;
    };

    it('should accept a community request and create community successfully', async () => {
      const mockRequest = createMockCommunityRequest();
      const communityEventDto: CommunityRequestEventDto = {
        id: mockRequest.id.value,
        name: mockRequest.name,
        description: mockRequest.description,
        status: RequestStatus.APPROVED,
        userId: validUserId,
        causeRequests: [],
        type: RequestType.COMMUNITY,
      };

      mockRequestsRepository.findById.mockResolvedValueOnce(right(mockRequest));
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockCommunitiesService.create.mockResolvedValueOnce(right(validCommunity.value));

      const result = await service.acceptRequest(communityEventDto);

      expect(result.isRight()).toBe(true);
      expect(mockRequestsRepository.findById).toHaveBeenCalledWith(communityEventDto.id, ['user']);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockCommunitiesService.create).toHaveBeenCalledWith(communityEventDto);
    });

    it('should accept a cause request and create cause successfully', async () => {
      const mockRequest = createMockCauseRequest();
      const causeEventDto: CauseRequestEventDto = {
        id: mockRequest.id.value,
        name: mockRequest.name,
        description: mockRequest.description,
        status: RequestStatus.APPROVED,
        userId: validUserId,
        communityId: validCommunityId,
        ods: [SustainableDevelopmentGoal.NoPoverty],
        initialDate: new Date('2026-01-01'),
        durationDays: 90,
        type: RequestType.CAUSE,
      };

      mockRequestsRepository.findById.mockResolvedValueOnce(right(mockRequest));
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockCausesService.create.mockResolvedValueOnce(right(validCause.value));

      const result = await service.acceptRequest(causeEventDto);

      expect(result.isRight()).toBe(true);
      expect(mockCausesService.create).toHaveBeenCalledWith(causeEventDto);
    });

    it('should accept an action request and create action successfully', async () => {
      const mockRequest = createMockActionRequest();
      const actionEventDto: ActionRequestEventDto = {
        id: mockRequest.id.value,
        name: mockRequest.name,
        description: mockRequest.description,
        status: RequestStatus.APPROVED,
        userId: validUserId,
        objectives: [],
        events: [],
        causeId: validCauseId,
        type: RequestType.ACTION,
      };

      mockRequestsRepository.findById.mockResolvedValueOnce(right(mockRequest));
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockActionsService.create.mockResolvedValueOnce(
        right({
          id: { value: 'f1b2c3d4-e5f6-4890-abcd-ef1234567888' },
        }),
      );

      const result = await service.acceptRequest(actionEventDto);

      expect(result.isRight()).toBe(true);
      expect(mockActionsService.create).toHaveBeenCalledWith(actionEventDto);
    });

    it('should return error when request is not found', async () => {
      const notFoundError = new EntityNotFoundException('Request', 'Request not found');
      mockRequestsRepository.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.acceptRequest({ id: validRequestId } as CommunityRequestEventDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(notFoundError);
      expect(mockCommunitiesService.create).not.toHaveBeenCalled();
    });

    it('should return error when save fails', async () => {
      const mockRequest = createMockCommunityRequest();
      const repoError = new RepositoryException('Database error');

      mockRequestsRepository.findById.mockResolvedValueOnce(right(mockRequest));
      mockRequestsRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.acceptRequest({
        id: mockRequest.id.value,
        type: RequestType.COMMUNITY,
      } as CommunityRequestEventDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(repoError);
      expect(mockCommunitiesService.create).not.toHaveBeenCalled();
    });

    it('should return error when community creation fails', async () => {
      const mockRequest = createMockCommunityRequest();
      const validationError = new ValidationError('Community creation failed');

      mockRequestsRepository.findById.mockResolvedValueOnce(right(mockRequest));
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockCommunitiesService.create.mockResolvedValueOnce(left(validationError));

      const result = await service.acceptRequest({
        id: mockRequest.id.value,
        name: mockRequest.name,
        description: mockRequest.description,
        type: RequestType.COMMUNITY,
      } as CommunityRequestEventDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(validationError);
    });
  });

  describe('rejectRequest', () => {
    const createMockCommunityRequest = () => {
      const request = CommunityRequest.create({
        name: 'Test Community Request',
        description: 'A valid description for the community request with more than 20 chars',
        status: RequestStatus.PENDING,
        type: RequestType.COMMUNITY,
        user: validUser.value as User,
        causeCreationRequests: [],
      });
      return request.value as CommunityRequest;
    };

    it('should reject a request successfully', async () => {
      const mockRequest = createMockCommunityRequest();
      const rejectDto = {
        id: mockRequest.id.value,
        reason: 'Request does not meet requirements',
        type: RequestType.COMMUNITY,
      } as CommunityRequestEventDto;

      mockRequestsRepository.findById.mockResolvedValueOnce(right(mockRequest));
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.rejectRequest(rejectDto);

      expect(result.isRight()).toBe(true);
      expect(mockRequestsRepository.findById).toHaveBeenCalledWith(rejectDto.id, ['user']);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return error when request is not found', async () => {
      const notFoundError = new EntityNotFoundException('Request', 'Request not found');
      mockRequestsRepository.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.rejectRequest({
        id: validRequestId,
        reason: 'Not valid',
      } as CommunityRequestEventDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(notFoundError);
    });

    it('should return error when save fails', async () => {
      const mockRequest = createMockCommunityRequest();
      const repoError = new RepositoryException('Database error');

      mockRequestsRepository.findById.mockResolvedValueOnce(right(mockRequest));
      mockRequestsRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.rejectRequest({
        id: mockRequest.id.value,
        reason: 'Not valid',
      } as CommunityRequestEventDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(repoError);
    });

    it('should use default reason when none provided', async () => {
      const mockRequest = createMockCommunityRequest();

      mockRequestsRepository.findById.mockResolvedValueOnce(right(mockRequest));
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.rejectRequest({
        id: mockRequest.id.value,
      } as CommunityRequestEventDto);

      expect(result.isRight()).toBe(true);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
