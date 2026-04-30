import { CausesController } from '@app/communities/causes/infrastructure/presentation/controllers/rest/causes.controller';
import { Cause } from '@app/communities/shared/domain/model/aggregates/cause';
import { CausesService } from '@app/communities/shared/domain/services/causes.service';
import { left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AUTHZ_COMMUNITY_CONTEXT_RESOLVER,
  AUTHZ_MEMBERSHIP_PERMISSION_SOURCE,
  PolicyRegistry,
} from '@solidarianid/security/nestjs';
import { EntityNotFoundError } from 'typeorm';

describe('CausesController', () => {
  let controller: CausesController;
  let mockService: { getAll: jest.Mock; getById: jest.Mock };

  beforeEach(async () => {
    mockService = { getAll: jest.fn(), getById: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausesController],
      providers: [
        { provide: CausesService, useValue: mockService },
        {
          provide: PolicyRegistry,
          useValue: {
            evaluate: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: AUTHZ_COMMUNITY_CONTEXT_RESOLVER,
          useValue: {
            resolve: jest.fn(),
          },
        },
        {
          provide: AUTHZ_MEMBERSHIP_PERMISSION_SOURCE,
          useValue: {
            findRole: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CausesController>(CausesController);
  });

  describe('getCauses', () => {
    it('returns [] when repository returns empty array', async () => {
      mockService.getAll.mockResolvedValueOnce(right([]));
      await expect(controller.getCauses()).resolves.toEqual([]);
      expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });

    it('returns summaries when repository returns data', async () => {
      const domainData = [
        {
          id: { value: '1' },
          name: 'Cause1',
          description: 'desc1',
          durationDays: 30,
          ods: [1, 2],
        },
        {
          id: { value: '2' },
          name: 'Cause2',
          description: 'desc2',
          durationDays: 60,
          ods: [3, 4],
        },
      ];
      const expectedDtos = [
        {
          id: '1',
          name: 'Cause1',
          description: 'desc1',
          durationDays: 30,
          ods: [1, 2],
        },
        {
          id: '2',
          name: 'Cause2',
          description: 'desc2',
          durationDays: 60,
          ods: [3, 4],
        },
      ];
      mockService.getAll.mockResolvedValueOnce(right(domainData));
      await expect(controller.getCauses()).resolves.toEqual(expectedDtos);
      expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });

    it('throws ValidationError when service returns left(ValidationError)', async () => {
      const err = new ValidationError('invalid data');
      mockService.getAll.mockResolvedValueOnce(left(err));
      await expect(controller.getCauses()).rejects.toThrow(err);
      expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCauseById', () => {
    it('returns cause detail when service returns data', async () => {
      const domainData = {
        id: { value: '1' },
        name: 'Cause1',
        description: 'desc1',
        durationDays: 30,
        ods: [1, 2],
        actions: [
          {
            id: { value: '10' },
            name: 'Action1',
            description: 'action desc1',
          },
          {
            id: { value: '11' },
            name: 'Action2',
            description: 'action desc2',
          },
        ],
      };

      const expectedDto = {
        id: '1',
        name: 'Cause1',
        description: 'desc1',
        durationDays: 30,
        ods: [1, 2],
        actions: [
          {
            id: '10',
            name: 'Action1',
            description: 'action desc1',
          },
          {
            id: '11',
            name: 'Action2',
            description: 'action desc2',
          },
        ],
      };
      mockService.getById.mockResolvedValueOnce(right(domainData));
      await expect(controller.getCauseById('1')).resolves.toEqual(expectedDto);
      expect(mockService.getById).toHaveBeenCalledWith('1', ['users', 'actions']);
    });

    it('throws RepositoryException when service returns left(RepositoryException)', async () => {
      const err = new RepositoryException('invalid data');
      mockService.getById.mockResolvedValueOnce(left(err));
      await expect(controller.getCauseById('1')).rejects.toThrow(err);
      expect(mockService.getById).toHaveBeenCalledWith('1', ['users', 'actions']);
    });

    it('throws EntityNotFoundError when service returns left(EntityNotFoundError)', async () => {
      const err = new EntityNotFoundError('Cause', 'Not found');
      mockService.getById.mockResolvedValueOnce(left(err));
      await expect(controller.getCauseById('999')).rejects.toThrow(err);
      expect(mockService.getById).toHaveBeenCalledWith('999', ['users', 'actions']);
    });
  });

  describe('getCausesByCommunityId', () => {
    it('returns causes when service returns data', async () => {
      const domainData = [
        {
          id: { value: '1' },
          name: 'Cause1',
          description: 'desc1',
          durationDays: 30,
          ods: [1, 2],
        },
        {
          id: { value: '2' },
          name: 'Cause2',
          description: 'desc2',
          durationDays: 60,
          ods: [3, 4],
        },
      ];
      const expectedDtos = [
        {
          id: '1',
          name: 'Cause1',
          description: 'desc1',
          durationDays: 30,
          ods: [1, 2],
        },
        {
          id: '2',
          name: 'Cause2',
          description: 'desc2',
          durationDays: 60,
          ods: [3, 4],
        },
      ];
      mockService.getAll.mockResolvedValueOnce(right(domainData));
      await expect(controller.getCauses()).resolves.toEqual(expectedDtos);
      expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });

    it('throws ValidationError when service returns left(ValidationError)', async () => {
      const err = new ValidationError('invalid data');
      mockService.getAll.mockResolvedValueOnce(left(err));
      await expect(controller.getCauses()).rejects.toThrow(err);
      expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCauseByCommunityId', () => {
    it('returns cause detail when service returns data', async () => {
      const domainData = {
        id: { value: '1' },
        name: 'Cause1',
        description: 'desc1',
        durationDays: 30,
        ods: [1, 2],
        actions: [
          {
            id: { value: '10' },
            name: 'Action1',
            description: 'action desc1',
          },
          {
            id: { value: '11' },
            name: 'Action2',
            description: 'action desc2',
          },
        ],
      };

      const expectedDto = {
        id: '1',
        name: 'Cause1',
        description: 'desc1',
        durationDays: 30,
        ods: [1, 2],
        actions: [
          {
            id: '10',
            name: 'Action1',
            description: 'action desc1',
          },
          {
            id: '11',
            name: 'Action2',
            description: 'action desc2',
          },
        ],
      };
      mockService.getById.mockResolvedValueOnce(right(domainData));
      await expect(controller.getCauseById('1')).resolves.toEqual(expectedDto);
      expect(mockService.getById).toHaveBeenCalledWith('1', ['users', 'actions']);
    });

    it('throws RepositoryException when service returns left(RepositoryException)', async () => {
      const err = new RepositoryException('invalid data');
      mockService.getById.mockResolvedValueOnce(left(err));
      await expect(controller.getCauseById('1')).rejects.toThrow(err);
      expect(mockService.getById).toHaveBeenCalledWith('1', ['users', 'actions']);
    });

    it('throws EntityNotFoundError when service returns left(EntityNotFoundError)', async () => {
      const err = new EntityNotFoundError(Cause.name, 'Not found');
      mockService.getById.mockResolvedValueOnce(left(err));
      await expect(controller.getCauseById('999')).rejects.toThrow(err);
      expect(mockService.getById).toHaveBeenCalledWith('999', ['users', 'actions']);
    });
  });
});
