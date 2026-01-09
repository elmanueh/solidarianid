import { Test, TestingModule } from '@nestjs/testing';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { CommunitiesServiceImpl } from '@app/communities/application/services/communities.service.impl';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { User } from '@app/communities/domain/model/entities/user';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunityRequestEventDto } from '@solidarianid/kafka';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

describe('CommunitiesServiceImpl', () => {
  let service: CommunitiesServiceImpl;
  let mockCommunityRepo: {
    findAll: jest.Mock;
    findById: jest.Mock;
    save: jest.Mock;
  };
  let mockUsersRepo: {
    findById: jest.Mock;
  };

  const validUserId = '550e8400-e29b-41d4-a716-446655440000';
  const validCommunityId = '550e8400-e29b-41d4-a716-446655440001';

  const createMockUser = (): User => {
    const userOrError = User.create({ fullName: 'Test User' }, validUserId);
    if (userOrError.isLeft()) throw new Error('Failed to create mock user');
    return userOrError.value;
  };

  const createValidCommunityDto = (): CommunityRequestEventDto => ({
    id: validCommunityId,
    name: 'Test Community',
    description: 'A valid test community description',
    status: RequestStatus.APPROVED,
    userId: validUserId,
    causeRequests: [],
    type: RequestType.COMMUNITY,
  });

  const createCommunityDtoWithCauses = (): CommunityRequestEventDto => ({
    ...createValidCommunityDto(),
    causeRequests: [
      {
        name: 'Test Cause',
        description: 'A valid test cause description',
        status: RequestStatus.APPROVED,
        ods: [SustainableDevelopmentGoal.AffordableAndCleanEnergy],
        initialDate: new Date('2026-01-01'),
        durationDays: 30,
      },
    ],
  });

  beforeEach(async () => {
    mockCommunityRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    mockUsersRepo = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunitiesServiceImpl,
        { provide: CommunitiesRepositoryPort, useValue: mockCommunityRepo },
        { provide: UsersRepositoryPort, useValue: mockUsersRepo },
      ],
    }).compile();

    service = module.get<CommunitiesServiceImpl>(CommunitiesServiceImpl);
  });

  describe('getCommunities', () => {
    it('returns empty array when repository returns []', async () => {
      mockCommunityRepo.findAll.mockResolvedValueOnce(right([]));
      await expect(service.getCommunities()).resolves.toEqual(right([]));
      expect(mockCommunityRepo.findAll).toHaveBeenCalledWith(['members', 'members.user']);
    });

    it('returns summaries when repository returns data', async () => {
      const data = [
        { id: '1', name: 'Comunidad 1', description: 'Esta es la comunidad 1' },
        { id: '2', name: 'Comunidad 2', description: 'Esta es la comunidad 2' },
      ];
      mockCommunityRepo.findAll.mockResolvedValueOnce(right(data));
      await expect(service.getCommunities()).resolves.toEqual(right(data));
      expect(mockCommunityRepo.findAll).toHaveBeenCalledWith(['members', 'members.user']);
    });

    it('propagates ValidationError from repository', async () => {
      const err = new ValidationError('invalid repo data');
      mockCommunityRepo.findAll.mockResolvedValueOnce(left(err));
      await expect(service.getCommunities()).resolves.toEqual(left(err));
      expect(mockCommunityRepo.findAll).toHaveBeenCalledWith(['members', 'members.user']);
    });
  });

  describe('getCommunityById', () => {
    it('returns community when repository returns data', async () => {
      const data = {
        id: '1',
        name: 'Comunidad 1',
        description: 'Esta es la comunidad 1',
      };
      mockCommunityRepo.findById.mockResolvedValueOnce(right(data));
      await expect(service.getCommunityById('1')).resolves.toEqual(right(data));
      expect(mockCommunityRepo.findById).toHaveBeenCalledWith('1', ['causes', 'members', 'members.user']);
    });

    it('propagates ValidationError from repository', async () => {
      const err = new ValidationError('invalid repo data');
      mockCommunityRepo.findById.mockResolvedValueOnce(left(err));
      await expect(service.getCommunityById('1')).resolves.toEqual(left(err));
      expect(mockCommunityRepo.findById).toHaveBeenCalledWith('1', ['causes', 'members', 'members.user']);
    });
  });

  describe('create', () => {
    it('creates a community successfully without causes', async () => {
      const mockUser = createMockUser();
      const dto = createValidCommunityDto();

      mockUsersRepo.findById.mockResolvedValueOnce(right(mockUser));
      mockCommunityRepo.save.mockResolvedValueOnce(right(undefined));

      const result = await service.create(dto);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(Community);
        expect(result.value.name).toBe(dto.name);
        expect(result.value.description).toBe(dto.description);
        expect(result.value.creator).toBe(mockUser);
        expect(result.value.members).toContain(mockUser);
        expect(result.value.causes).toHaveLength(0);
      }
      expect(mockUsersRepo.findById).toHaveBeenCalledWith(dto.userId);
      expect(mockCommunityRepo.save).toHaveBeenCalledTimes(1);
    });

    it('creates a community with causes successfully', async () => {
      const mockUser = createMockUser();
      const dto = createCommunityDtoWithCauses();

      mockUsersRepo.findById.mockResolvedValueOnce(right(mockUser));
      mockCommunityRepo.save.mockResolvedValueOnce(right(undefined));

      const result = await service.create(dto);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(Community);
        expect(result.value.causes).toHaveLength(1);
        expect(result.value.causes[0].name).toBe('Test Cause');
        expect(result.value.causes[0].ods).toContain(SustainableDevelopmentGoal.AffordableAndCleanEnergy);
      }
    });

    it('returns error when user is not found', async () => {
      const dto = createValidCommunityDto();
      const notFoundError = new EntityNotFoundException('User not found');

      mockUsersRepo.findById.mockResolvedValueOnce(left(notFoundError));

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(notFoundError);
      expect(mockCommunityRepo.save).not.toHaveBeenCalled();
    });

    it('returns error when community name is invalid', async () => {
      const mockUser = createMockUser();
      const dto = createValidCommunityDto();
      dto.name = ''; // Invalid name

      mockUsersRepo.findById.mockResolvedValueOnce(right(mockUser));

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockCommunityRepo.save).not.toHaveBeenCalled();
    });

    it('returns error when cause creation fails', async () => {
      const mockUser = createMockUser();
      const dto = createCommunityDtoWithCauses();
      dto.causeRequests[0].name = ''; // Invalid cause name

      mockUsersRepo.findById.mockResolvedValueOnce(right(mockUser));

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockCommunityRepo.save).not.toHaveBeenCalled();
    });

    it('returns error when repository save fails', async () => {
      const mockUser = createMockUser();
      const dto = createValidCommunityDto();
      const repoError = new RepositoryException('Database error');

      mockUsersRepo.findById.mockResolvedValueOnce(right(mockUser));
      mockCommunityRepo.save.mockResolvedValueOnce(left(repoError));

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(repoError);
    });
  });
});
