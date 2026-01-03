import { Test, TestingModule } from '@nestjs/testing';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RequestsServiceImpl } from '@app/communities/application/services/requests.service.impl';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { RequestPublisherPort } from '@app/communities/domain/ports/requests.publisher.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CreateCommunityRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-community.request.dto';
import { CreateCauseRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-cause.request.dto';
import { CreateActionRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/create-request-action.request.dto';
import { User } from '@app/communities/domain/model/entities/user';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

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
  let mockRequestPublisher: { publish: jest.Mock };
  let mockUsersRepository: {
    findById: jest.Mock;
    save: jest.Mock;
    findAll: jest.Mock;
    remove: jest.Mock;
  };

  const validUserId = 'a1b2c3d4-e5f6-4890-abcd-ef1234567001';
  const validCommunityId = 'b1b2c3d4-e5f6-4890-abcd-ef1234567002';
  const validCauseId = 'c1b2c3d4-e5f6-4890-abcd-ef1234567003';
  const validUser = User.create({ fullName: 'Juan Voluntario García' }, validUserId);
  const validCommunity = Community.create(
    { name: 'Test Community', description: 'A valid community description for testing with more than 20 chars' },
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
    mockRequestPublisher = { publish: jest.fn() };
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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsServiceImpl,
        { provide: RequestsRepositoryPort, useValue: mockRequestsRepository },
        { provide: RequestPublisherPort, useValue: mockRequestPublisher },
        { provide: UsersRepositoryPort, useValue: mockUsersRepository },
        { provide: CommunitiesRepositoryPort, useValue: mockCommunityRepository },
        { provide: CausesRepositoryPort, useValue: mockCauseRepository },
      ],
    }).compile();

    service = module.get<RequestsServiceImpl>(RequestsServiceImpl);
  });

  describe('createCommunityRequest', () => {
    const validCommunityDto: CreateCommunityRequestDto = {
      name: 'Comunidad de Prueba',
      description: 'Esta es una descripción válida para la comunidad de prueba con más de 20 caracteres',
      userId: validUserId,
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
      mockRequestPublisher.publish.mockResolvedValueOnce(undefined);

      const result = await service.createCommunityRequest(validCommunityDto);

      expect(result.isRight()).toBe(true);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(validUserId);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRequestPublisher.publish).toHaveBeenCalledTimes(1);
    });

    it('should return EntityNotFoundException when user does not exist', async () => {
      const notFoundError = new EntityNotFoundException('User', 'User not found');
      mockUsersRepository.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.createCommunityRequest(validCommunityDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(EntityNotFoundException);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
      expect(mockRequestPublisher.publish).not.toHaveBeenCalled();
    });

    it('should return ValidationError when name is invalid', async () => {
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);

      const invalidDto: CreateCommunityRequestDto = {
        ...validCommunityDto,
        name: 'ab', // Demasiado corto
      };

      const result = await service.createCommunityRequest(invalidDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      const repoError = new RepositoryException('Database error');
      mockRequestsRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.createCommunityRequest(validCommunityDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
      expect(mockRequestPublisher.publish).not.toHaveBeenCalled();
    });
  });

  describe('createCauseRequest', () => {
    const validCauseDto: CreateCauseRequestDto = {
      name: 'Causa Benéfica de Prueba',
      description: 'Esta es una descripción válida para la causa benéfica con más de 20 caracteres',
      userId: validUserId,
      communityId: validCommunityId,
      ods: [SustainableDevelopmentGoal.ZeroHunger],
      initialDate: '2026-02-01T00:00:00.000Z',
      durationDays: 180,
    };

    it('should create a cause request successfully', async () => {
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockRequestPublisher.publish.mockResolvedValueOnce(undefined);

      const result = await service.createCauseRequest(validCauseDto);

      expect(result.isRight()).toBe(true);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(validUserId);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRequestPublisher.publish).toHaveBeenCalledTimes(1);
    });

    it('should return EntityNotFoundException when user does not exist', async () => {
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      const notFoundError = new EntityNotFoundException('User', 'User not found');
      mockUsersRepository.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.createCauseRequest(validCauseDto);

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

      const result = await service.createCauseRequest(invalidDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      mockCommunityRepository.findById.mockResolvedValueOnce(right(validCommunity.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      const repoError = new RepositoryException('Database error');
      mockRequestsRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.createCauseRequest(validCauseDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
      expect(mockRequestPublisher.publish).not.toHaveBeenCalled();
    });
  });

  describe('createActionRequest', () => {
    const validActionDto: CreateActionRequestDto = {
      name: 'Acción Solidaria de Prueba',
      description: 'Esta es una descripción válida para la acción solidaria con más de 20 caracteres',
      userId: validUserId,
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
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockRequestPublisher.publish.mockResolvedValueOnce(undefined);

      const result = await service.createActionRequest(validActionDto);

      expect(result.isRight()).toBe(true);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(validUserId);
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRequestPublisher.publish).toHaveBeenCalledTimes(1);
    });

    it('should return EntityNotFoundException when user does not exist', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      const notFoundError = new EntityNotFoundException('User', 'User not found');
      mockUsersRepository.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.createActionRequest(validActionDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(EntityNotFoundException);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when name is invalid', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);

      const invalidDto: CreateActionRequestDto = {
        ...validActionDto,
        name: 'ab', // Demasiado corto
      };

      const result = await service.createActionRequest(invalidDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockRequestsRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      const repoError = new RepositoryException('Database error');
      mockRequestsRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.createActionRequest(validActionDto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
      expect(mockRequestPublisher.publish).not.toHaveBeenCalled();
    });

    it('should publish event after successful save', async () => {
      mockCauseRepository.findById.mockResolvedValueOnce(right(validCause.value));
      mockUsersRepository.findById.mockResolvedValueOnce(validUser);
      mockRequestsRepository.save.mockResolvedValueOnce(right(undefined));
      mockRequestPublisher.publish.mockResolvedValueOnce(undefined);

      await service.createActionRequest(validActionDto);

      expect(mockRequestPublisher.publish).toHaveBeenCalledTimes(1);
      expect(mockRequestPublisher.publish).toHaveBeenCalledWith(
        expect.any(String) as unknown as string, // EventType.REQUEST_CREATED
        expect.objectContaining({
          id: expect.objectContaining({}) as unknown as object,
        }) as unknown as object,
      );
    });
  });
});
