import { Test, TestingModule } from '@nestjs/testing';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { CommunitiesController } from '@app/communities/infrastructure/presentation/controllers/communities.controller';
import { EntityNotFoundError } from 'typeorm';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

describe('CommunitiesController', () => {
  let controller: CommunitiesController;
  let mockService: { getCommunities: jest.Mock; getCommunityById: jest.Mock };

  beforeEach(async () => {
    mockService = { getCommunities: jest.fn(), getCommunityById: jest.fn() };

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
        { id: { value: '1' }, name: 'Com1', description: 'desc1' },
        { id: { value: '2' }, name: 'Com2', description: 'desc2' },
      ];
      const expectedDtos = [
        { id: '1', name: 'Com1', description: 'desc1' },
        { id: '2', name: 'Com2', description: 'desc2' },
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
  });

  describe('getCommunityById', () => {
    it('returns community detail when service returns data', async () => {
      const domainData = {
        id: { value: '1' },
        name: 'Com1',
        description: 'desc1',
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
      await expect(controller.getCommunityById('1')).resolves.toEqual(
        expectedDto,
      );
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
});
