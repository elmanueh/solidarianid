import { Test, TestingModule } from '@nestjs/testing';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

import { CausesService } from '@app/communities/domain/services/causes.service';
import { CausesController } from '@app/communities/infrastructure/presentation/controllers/causes.controller';
import { EntityNotFoundError } from 'typeorm';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

describe('CausesController', () => {
  let controller: CausesController;
  let mockService: { getCauses: jest.Mock; getCauseById: jest.Mock };

  beforeEach(async () => {
    mockService = { getCauses: jest.fn(), getCauseById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausesController],
      providers: [{ provide: CausesService, useValue: mockService }],
    }).compile();

    controller = module.get<CausesController>(CausesController);
  });

  describe('getCauses', () => {
    it('returns [] when repository returns empty array', async () => {
      mockService.getCauses.mockResolvedValueOnce(right([]));
      await expect(controller.getCauses()).resolves.toEqual([]);
      expect(mockService.getCauses).toHaveBeenCalledTimes(1);
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
      mockService.getCauses.mockResolvedValueOnce(right(domainData));
      await expect(controller.getCauses()).resolves.toEqual(expectedDtos);
      expect(mockService.getCauses).toHaveBeenCalledTimes(1);
    });

    it('throws ValidationError when service returns left(ValidationError)', async () => {
      const err = new ValidationError('invalid data');
      mockService.getCauses.mockResolvedValueOnce(left(err));
      await expect(controller.getCauses()).rejects.toThrow(err);
      expect(mockService.getCauses).toHaveBeenCalledTimes(1);
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
      mockService.getCauseById.mockResolvedValueOnce(right(domainData));
      await expect(controller.getCauseById('1')).resolves.toEqual(expectedDto);
      expect(mockService.getCauseById).toHaveBeenCalledWith('1');
    });

    it('throws RepositoryException when service returns left(RepositoryException)', async () => {
      const err = new RepositoryException('invalid data');
      mockService.getCauseById.mockResolvedValueOnce(left(err));
      await expect(controller.getCauseById('1')).rejects.toThrow(err);
      expect(mockService.getCauseById).toHaveBeenCalledWith('1');
    });

    it('throws EntityNotFoundError when service returns left(EntityNotFoundError)', async () => {
      const err = new EntityNotFoundError('Cause', 'Not found');
      mockService.getCauseById.mockResolvedValueOnce(left(err));
      await expect(controller.getCauseById('999')).rejects.toThrow(err);
      expect(mockService.getCauseById).toHaveBeenCalledWith('999');
    });
  });
});
