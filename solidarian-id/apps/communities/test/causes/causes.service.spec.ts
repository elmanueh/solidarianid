import { CausesServiceImpl } from '@app/communities/application/services/causes.service.impl';
import { UserPermissionError } from '@app/communities/domain/errors/user-permission.error';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { User } from '@app/communities/domain/model/entities/user';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { CausesQueryRepositoryPort } from '@app/communities/domain/ports/causes-query.repository.port';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { DomainEventBusPort } from '@app/communities/domain/ports/domain-event-bus.port';
import { PushSubscriptionRepositoryPort } from '@app/communities/domain/ports/push-subscription.repository.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { left, right } from '@app/ddd/either';
import { ConflictError } from '@app/ddd/errors/conflict-error';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Test, TestingModule } from '@nestjs/testing';
import { CauseRequestEventDto } from '@solidarianid/kafka';

describe('CausesServiceImpl', () => {
  let service: CausesServiceImpl;
  let mockCauseRepository: {
    findAll: jest.Mock;
    findAllByFollowerId: jest.Mock;
    findAllFollowedCauseIdsByUserId: jest.Mock;
    findById: jest.Mock;
    save: jest.Mock;
    removeFollower: jest.Mock;
  };
  let mockUsersRepository: {
    findById: jest.Mock;
  };
  let mockCommunitiesRepository: {
    findById: jest.Mock;
  };
  let mockCausesQueryRepository: {
    findExplore: jest.Mock;
  };
  let mockEventBus: { publish: jest.Mock };
  let mockSubscriptionsRepository: {
    findByUserId: jest.Mock;
    save: jest.Mock;
  };

  const validCommunityId = 'b1b2c3d4-e5f6-4890-abcd-ef1234567002';
  const validCauseId = 'c1b2c3d4-e5f6-4890-abcd-ef1234567003';
  const validUserId = 'a1b2c3d4-e5f6-4890-abcd-ef1234567001';

  const createValidCauseDto = (): CauseRequestEventDto => ({
    id: validCauseId,
    name: 'Test Cause',
    description: 'A valid test cause description with more than 20 characters',
    status: RequestStatus.APPROVED,
    userId: validUserId,
    communityId: validCommunityId,
    ods: [SustainableDevelopmentGoal.NoPoverty],
    initialDate: new Date('2026-01-01'),
    durationDays: 90,
    type: RequestType.CAUSE,
  });

  const createMockCause = (): Cause => {
    const causeOrError = Cause.create(
      {
        name: 'Test Cause',
        description: 'A valid test cause description with more than 20 characters',
        ods: [SustainableDevelopmentGoal.NoPoverty],
        initialDate: new Date('2026-01-01'),
        durationDays: 90,
        communityId: validCommunityId,
      },
      validCauseId,
    );
    if (causeOrError.isLeft()) throw new Error('Failed to create mock cause');
    return causeOrError.value;
  };

  const createMockUser = (id: string = validUserId): User => {
    const userOrError = User.create({ fullName: 'Test User' }, id);

    if (userOrError.isLeft()) throw new Error('Failed to create mock user');

    return userOrError.value;
  };

  const createMockCommunity = (members: User[] = [createMockUser()]): Community => {
    const communityOrError = Community.create(
      {
        name: 'Test Community',
        description: 'A valid test community description with more than 20 characters',
        creator: members[0],
        members,
      },
      validCommunityId,
    );

    if (communityOrError.isLeft()) throw new Error('Failed to create mock community');

    return communityOrError.value;
  };

  beforeEach(async () => {
    mockCauseRepository = {
      findAll: jest.fn(),
      findAllByFollowerId: jest.fn(),
      findAllFollowedCauseIdsByUserId: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      removeFollower: jest.fn(),
    };
    mockUsersRepository = {
      findById: jest.fn(),
    };
    mockCommunitiesRepository = {
      findById: jest.fn(),
    };
    mockCausesQueryRepository = {
      findExplore: jest.fn(),
    };
    mockEventBus = { publish: jest.fn().mockResolvedValue(undefined) };
    mockSubscriptionsRepository = {
      findByUserId: jest.fn().mockResolvedValue(right([])),
      save: jest.fn().mockResolvedValue(right(undefined)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CausesServiceImpl,
        { provide: CausesRepositoryPort, useValue: mockCauseRepository },
        { provide: CausesQueryRepositoryPort, useValue: mockCausesQueryRepository },
        { provide: UsersRepositoryPort, useValue: mockUsersRepository },
        { provide: CommunitiesRepositoryPort, useValue: mockCommunitiesRepository },
        { provide: DomainEventBusPort, useValue: mockEventBus },
        { provide: PushSubscriptionRepositoryPort, useValue: mockSubscriptionsRepository },
      ],
    }).compile();

    service = module.get<CausesServiceImpl>(CausesServiceImpl);
  });

  describe('create', () => {
    it('should create a cause successfully', async () => {
      const dto = createValidCauseDto();
      mockCauseRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.create(dto);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(Cause);
        expect(result.value.name).toBe(dto.name);
        expect(result.value.description).toBe(dto.description);
        expect(result.value.durationDays).toBe(dto.durationDays);
        expect(result.value.ods).toEqual(dto.ods);
        expect(result.value.communityId).toBe(dto.communityId);
        expect(result.value.userIds).toEqual([dto.userId]);
      }
      expect(mockCauseRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return ValidationError when name is invalid', async () => {
      const dto = createValidCauseDto();
      dto.name = 'ab'; // Too short

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when description is invalid', async () => {
      const dto = createValidCauseDto();
      dto.description = 'short'; // Too short

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when durationDays is invalid', async () => {
      const dto = createValidCauseDto();
      dto.durationDays = -1; // Negative duration

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      const dto = createValidCauseDto();
      const repoError = new RepositoryException('Database error');
      mockCauseRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
    });
  });

  describe('getCauses', () => {
    it('should return empty array when repository returns []', async () => {
      mockCauseRepository.findAll.mockResolvedValueOnce(right([]));

      const result = await service.getAll();

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual([]);
      }
      expect(mockCauseRepository.findAll).toHaveBeenCalledWith(['users']);
    });

    it('should return causes when repository returns data', async () => {
      const mockCauses = [createMockCause()];
      mockCauseRepository.findAll.mockResolvedValueOnce(right(mockCauses));

      const result = await service.getAll();

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0]).toBeInstanceOf(Cause);
      }
      expect(mockCauseRepository.findAll).toHaveBeenCalledWith(['users']);
    });

    it('should propagate ValidationError from repository', async () => {
      const err = new ValidationError('Invalid repository data');
      mockCauseRepository.findAll.mockResolvedValueOnce(left(err));

      const result = await service.getAll();

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(err);
      expect(mockCauseRepository.findAll).toHaveBeenCalledWith(['users']);
    });
  });

  describe('getCauseById', () => {
    it('should return cause when repository returns data', async () => {
      const mockCause = createMockCause();
      mockCauseRepository.findById.mockResolvedValueOnce(right(mockCause));

      const result = await service.getById(validCauseId);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(Cause);
        expect(result.value.id.value).toBe(validCauseId);
      }
      expect(mockCauseRepository.findById).toHaveBeenCalledWith(validCauseId, ['users']);
    });

    it('should propagate ValidationError from repository', async () => {
      const err = new ValidationError('Cause not found');
      mockCauseRepository.findById.mockResolvedValueOnce(left(err));

      const result = await service.getById(validCauseId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(err);
      expect(mockCauseRepository.findById).toHaveBeenCalledWith(validCauseId, ['users']);
    });

    it('should request users relation when fetching by id', async () => {
      const mockCause = createMockCause();
      mockCauseRepository.findById.mockResolvedValueOnce(right(mockCause));

      await service.getById(validCauseId);

      expect(mockCauseRepository.findById).toHaveBeenCalledWith(validCauseId, ['users']);
    });
  });

  describe('getUserFollowedCauses', () => {
    it('should normalize generic repository not found errors to User not found', async () => {
      mockUsersRepository.findById.mockResolvedValueOnce(left(new EntityNotFoundException('Entity', validUserId)));

      const result = await service.getUserFollowedCauses(validUserId);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toContain(`User with ID ${validUserId}`);
      }
    });

    it('should return empty array when the user has no followed causes', async () => {
      mockUsersRepository.findById.mockResolvedValueOnce(right(createMockUser()));
      mockCauseRepository.findAllByFollowerId.mockResolvedValueOnce(right([]));

      const result = await service.getUserFollowedCauses(validUserId);

      expect(result).toEqual(right([]));
      expect(mockCauseRepository.findAllByFollowerId).toHaveBeenCalledWith(validUserId, ['users']);
    });

    it('should return followed causes directly from repository query', async () => {
      const causes = [
        { ...createMockCause(), id: { value: 'c1b2c3d4-e5f6-4890-abcd-ef1234567999' } },
        { ...createMockCause(), id: { value: validCauseId } },
      ];

      mockUsersRepository.findById.mockResolvedValueOnce(right(createMockUser()));
      mockCauseRepository.findAllByFollowerId.mockResolvedValueOnce(right(causes));

      const result = await service.getUserFollowedCauses(validUserId);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual(causes);
      }
      expect(mockCauseRepository.findAllByFollowerId).toHaveBeenCalledWith(validUserId, ['users']);
    });
  });

  describe('joinCause', () => {
    it('should add a follower when the user belongs to the cause community', async () => {
      const cause = createMockCause();
      const user = createMockUser();
      const community = createMockCommunity([user]);

      mockCauseRepository.findById.mockResolvedValueOnce(right(cause));
      mockUsersRepository.findById.mockResolvedValueOnce(right(user));
      mockCommunitiesRepository.findById.mockResolvedValueOnce(right(community));
      mockCauseRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.joinCause(validCauseId, validUserId);

      expect(result.isRight()).toBe(true);
      expect(cause.userIds).toContain(validUserId);
      expect(mockCauseRepository.findById).toHaveBeenCalledWith(validCauseId, ['users']);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(validUserId);
      expect(mockCommunitiesRepository.findById).toHaveBeenCalledWith(validCommunityId, ['members', 'members.user']);
      expect(mockCauseRepository.save).toHaveBeenCalledWith(cause);
    });

    it('should return ConflictError when the user already follows the cause', async () => {
      const causeOrError = Cause.create(
        {
          name: 'Test Cause',
          description: 'A valid test cause description with more than 20 characters',
          ods: [SustainableDevelopmentGoal.NoPoverty],
          initialDate: new Date('2026-01-01'),
          durationDays: 90,
          communityId: validCommunityId,
          userIds: [validUserId],
        },
        validCauseId,
      );
      const user = createMockUser();

      if (causeOrError.isLeft()) throw new Error('Failed to create mock cause');

      mockCauseRepository.findById.mockResolvedValueOnce(right(causeOrError.value));
      mockUsersRepository.findById.mockResolvedValueOnce(right(user));

      const result = await service.joinCause(validCauseId, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ConflictError);
      expect(mockCommunitiesRepository.findById).not.toHaveBeenCalled();
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });

    it('should return UserPermissionError when the user is not a community member', async () => {
      const cause = createMockCause();
      const user = createMockUser();
      const otherUser = createMockUser('a1b2c3d4-e5f6-4890-abcd-ef1234567005');
      const community = createMockCommunity([otherUser]);

      mockCauseRepository.findById.mockResolvedValueOnce(right(cause));
      mockUsersRepository.findById.mockResolvedValueOnce(right(user));
      mockCommunitiesRepository.findById.mockResolvedValueOnce(right(community));

      const result = await service.joinCause(validCauseId, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(UserPermissionError);
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('leaveCause', () => {
    it('should remove a follower when the user is already supporting the cause', async () => {
      const causeOrError = Cause.create(
        {
          name: 'Test Cause',
          description: 'A valid test cause description with more than 20 characters',
          ods: [SustainableDevelopmentGoal.NoPoverty],
          initialDate: new Date('2026-01-01'),
          durationDays: 90,
          communityId: validCommunityId,
          userIds: [validUserId],
        },
        validCauseId,
      );
      const user = createMockUser();

      if (causeOrError.isLeft()) throw new Error('Failed to create mock cause');

      mockCauseRepository.findById.mockResolvedValueOnce(right(causeOrError.value));
      mockUsersRepository.findById.mockResolvedValueOnce(right(user));
      mockCauseRepository.removeFollower.mockResolvedValueOnce(right(undefined));

      const result = await service.leaveCause(validCauseId, validUserId);

      expect(result.isRight()).toBe(true);
      expect(mockCauseRepository.findById).toHaveBeenCalledWith(validCauseId, ['users']);
      expect(mockCauseRepository.removeFollower).toHaveBeenCalledWith(validCauseId, validUserId);
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });

    it('should return ConflictError when the user is not following the cause', async () => {
      const cause = createMockCause();
      const user = createMockUser();

      mockCauseRepository.findById.mockResolvedValueOnce(right(cause));
      mockUsersRepository.findById.mockResolvedValueOnce(right(user));

      const result = await service.leaveCause(validCauseId, validUserId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ConflictError);
      expect(mockCauseRepository.removeFollower).not.toHaveBeenCalled();
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });
  });
});
