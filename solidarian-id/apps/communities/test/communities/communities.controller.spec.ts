import { Test, TestingModule } from '@nestjs/testing';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { CommunitiesController } from '@app/communities/infrastructure/presentation/controllers/communities.controller';
import { EntityNotFoundError } from 'typeorm';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CommunityRankingUserResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/community-ranking-user.response.dto';

describe('CommunitiesController', () => {
  let controller: CommunitiesController;
  let mockService: {
    getCommunities: jest.Mock;
    getCommunityById: jest.Mock;
    getOrderByMostUsers: jest.Mock;
    getJoinedUsersLastMonths: jest.Mock;
    joinCommunity: jest.Mock;
  };

  beforeEach(async () => {
    mockService = {
      getCommunities: jest.fn(),
      getCommunityById: jest.fn(),
      getOrderByMostUsers: jest.fn(),
      getJoinedUsersLastMonths: jest.fn(),
      joinCommunity: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunitiesController],
      providers: [{ provide: CommunitiesService, useValue: mockService }],
    }).compile();

    controller = module.get<CommunitiesController>(CommunitiesController);
  });

  describe('getCommunities', () => {
    it('returns [] when repository returns empty array', async () => {
      mockService.getCommunities.mockResolvedValueOnce(right([]));
      await expect(controller.getCommunities()).resolves.toEqual([]);
      expect(mockService.getCommunities).toHaveBeenCalledTimes(1);
    });

    it('returns summaries when repository returns data', async () => {
      const domainData = [
        { id: { value: '1' }, name: 'Com1', description: 'desc1', creator: { id: { value: 'creator-1' } } },
        { id: { value: '2' }, name: 'Com2', description: 'desc2', creator: { id: { value: 'creator-2' } } },
      ];
      const expectedDtos = [
        { id: '1', name: 'Com1', description: 'desc1', creatorId: 'creator-1' },
        { id: '2', name: 'Com2', description: 'desc2', creatorId: 'creator-2' },
      ];
      mockService.getCommunities.mockResolvedValueOnce(right(domainData));
      await expect(controller.getCommunities()).resolves.toEqual(expectedDtos);
      expect(mockService.getCommunities).toHaveBeenCalledTimes(1);
    });

    it('throws ValidationError when service returns left(ValidationError)', async () => {
      const err = new ValidationError('invalid data');
      mockService.getCommunities.mockResolvedValueOnce(left(err));
      await expect(controller.getCommunities()).rejects.toThrow(err);
      expect(mockService.getCommunities).toHaveBeenCalledTimes(1);
    });

    it('returns ranking when criteria is most-users', async () => {
      const domainData = [
        { communityId: '1', communityName: 'Com1', userCount: 5 },
        { communityId: '2', communityName: 'Com2', userCount: 3 },
      ];
      mockService.getOrderByMostUsers.mockResolvedValueOnce(right(domainData));

      const result = (await controller.getCommunities('most-users', 10)) as CommunityRankingUserResponseDto[];
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Com1');
      expect(result[0].userCount).toBe(5);
      expect(mockService.getOrderByMostUsers).toHaveBeenCalledWith(10);
    });
  });

  describe('getCommunityById', () => {
    it('returns community detail when service returns data', async () => {
      const domainData = {
        id: { value: '1' },
        name: 'Com1',
        description: 'desc1',
        creator: { id: { value: 'creator-1' } },
        causes: [
          {
            id: { value: '10' },
            name: 'Cause1',
            description: 'cause desc1',
            durationDays: 30,
            ods: [1, 2],
          },
          {
            id: { value: '11' },
            name: 'Cause2',
            description: 'cause desc2',
            durationDays: 60,
            ods: [3, 4],
          },
        ],
      };

      const expectedDto = {
        id: '1',
        name: 'Com1',
        description: 'desc1',
        creatorId: 'creator-1',
        causes: [
          {
            id: '10',
            name: 'Cause1',
            description: 'cause desc1',
            durationDays: 30,
            ods: [1, 2],
          },
          {
            id: '11',
            name: 'Cause2',
            description: 'cause desc2',
            durationDays: 60,
            ods: [3, 4],
          },
        ],
      };
      mockService.getCommunityById.mockResolvedValueOnce(right(domainData));
      await expect(controller.getCommunityById('1')).resolves.toEqual(expectedDto);
      expect(mockService.getCommunityById).toHaveBeenCalledWith('1');
    });

    it('throws RepositoryException when service returns left(ValidationError)', async () => {
      const err = new RepositoryException('invalid data');
      mockService.getCommunityById.mockResolvedValueOnce(left(err));
      await expect(controller.getCommunityById('1')).rejects.toThrow(err);
      expect(mockService.getCommunityById).toHaveBeenCalledWith('1');
    });

    it('throws NotFoundError when service returns ValidationError', async () => {
      const err = new EntityNotFoundError('Community', 'Not found');
      mockService.getCommunityById.mockResolvedValueOnce(left(err));
      await expect(controller.getCommunityById('999')).rejects.toThrow(err);
      expect(mockService.getCommunityById).toHaveBeenCalledWith('999');
    });
  });

  describe('getCommunitiesOrderByMostUsers', () => {
    it('returns ranking DTOs when service returns data', async () => {
      const domainData = [
        { communityId: '1', communityName: 'Com1', userCount: 5 },
        { communityId: '2', communityName: 'Com2', userCount: 3 },
      ];
      mockService.getOrderByMostUsers.mockResolvedValueOnce(right(domainData));

      const result = await controller.getCommunitiesOrderByMostUsers(2);
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Com1');
      expect(result[0].userCount).toBe(5);
    });
    it('throws error when service returns left', async () => {
      const err = new ValidationError('invalid');
      mockService.getOrderByMostUsers.mockResolvedValueOnce(left(err));
      await expect(controller.getCommunitiesOrderByMostUsers(2)).rejects.toThrow(err);
    });
  });

  describe('getJoinedUsersLastMonths', () => {
    it('returns summary DTO when service returns data', async () => {
      const domainData = [
        { communityName: 'Com1', month: '2026-01', userCount: 2 },
        { communityName: 'Com1', month: '2026-02', userCount: 3 },
      ];
      mockService.getJoinedUsersLastMonths.mockResolvedValueOnce(right(domainData));

      const result = await controller.getJoinedUsersLastMonths('uuid', 2);
      expect(result.communityName).toBe('Com1');
      expect(result.dataRange.length).toBe(2);
      expect(result.dataRange[0].month).toBe('2026-01');
      expect(result.dataRange[0].userCount).toBe(2);
    });
    it('throws error when service returns left', async () => {
      const err = new ValidationError('invalid');
      mockService.getJoinedUsersLastMonths.mockResolvedValueOnce(left(err));
      await expect(controller.getJoinedUsersLastMonths('uuid', 2)).rejects.toThrow(err);
    });
  });

  describe('joinCommunity', () => {
    it('returns undefined when join is successful', async () => {
      mockService.joinCommunity.mockResolvedValueOnce(right(undefined));
      await expect(controller.joinCommunity('uuid', { userId: 'user-1' })).resolves.toBeUndefined();
      expect(mockService.joinCommunity).toHaveBeenCalledWith('uuid', 'user-1');
    });
    it('throws error when service returns left', async () => {
      const err = new ValidationError('already member');
      mockService.joinCommunity.mockResolvedValueOnce(left(err));
      await expect(controller.joinCommunity('uuid', { userId: 'user-1' })).rejects.toThrow(err);
    });
  });
});
