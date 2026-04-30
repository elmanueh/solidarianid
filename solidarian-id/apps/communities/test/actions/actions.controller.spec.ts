import { ActionsController } from '@app/communities/actions/infrastructure/presentation/controllers/rest/actions.controller';
import { ActionsService } from '@app/communities/shared/domain/services/actions.service';
import { left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm';

describe('ActionsController', () => {
  let controller: ActionsController;
  let mockService: { getActions: jest.Mock; getActionById: jest.Mock };

  beforeEach(async () => {
    mockService = { getActions: jest.fn(), getActionById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionsController],
      providers: [{ provide: ActionsService, useValue: mockService }],
    }).compile();

    controller = module.get<ActionsController>(ActionsController);
  });

  describe('getActions', () => {
    it('returns [] when repository returns empty array', async () => {
      mockService.getActions.mockResolvedValueOnce(right([]));
      await expect(controller.getActions()).resolves.toEqual([]);
      expect(mockService.getActions).toHaveBeenCalledTimes(1);
    });

    it('returns summaries when repository returns data', async () => {
      const domainData = [
        {
          id: { value: '1' },
          name: 'Action1',
          description: 'desc1',
        },
        {
          id: { value: '2' },
          name: 'Action2',
          description: 'desc2',
        },
      ];
      const expectedDtos = [
        {
          id: '1',
          name: 'Action1',
          description: 'desc1',
        },
        {
          id: '2',
          name: 'Action2',
          description: 'desc2',
        },
      ];
      mockService.getActions.mockResolvedValueOnce(right(domainData));
      await expect(controller.getActions()).resolves.toEqual(expectedDtos);
      expect(mockService.getActions).toHaveBeenCalledTimes(1);
    });

    it('throws ValidationError when service returns left(ValidationError)', async () => {
      const err = new ValidationError('invalid data');
      mockService.getActions.mockResolvedValueOnce(left(err));
      await expect(controller.getActions()).rejects.toThrow(err);
      expect(mockService.getActions).toHaveBeenCalledTimes(1);
    });
  });

  describe('getActionById', () => {
    it('returns action detail when service returns data', async () => {
      const domainData = {
        id: { value: '1' },
        name: 'Action1',
        description: 'desc1',
        events: [
          {
            id: { value: '10' },
            name: 'Event1',
            description: 'event desc1',
            initialDate: new Date('2024-12-01'),
            place: {
              direction: '123 Main St',
              city: 'CityA',
              countryCode: 'CA',
            },
          },
        ],
        objectives: [
          {
            name: 'Objective1',
            description: 'obj desc1',
            quantity: 100,
            currentAmount: 50,
            unit: 'kg',
          },
          {
            name: 'Objective2',
            description: 'obj desc2',
            quantity: 200,
            currentAmount: 120,
            unit: 'euros',
          },
        ],
      };

      const expectedDto = {
        id: '1',
        name: 'Action1',
        description: 'desc1',
        events: [
          {
            id: '10',
            name: 'Event1',
            description: 'event desc1',
            initialDate: new Date('2024-12-01'),
            place: {
              direction: '123 Main St',
              city: 'CityA',
              countryCode: 'CA',
            },
          },
        ],
        objectives: [
          {
            name: 'Objective1',
            description: 'obj desc1',
            quantity: 100,
            currentAmount: 50,
            unit: 'kg',
          },
          {
            name: 'Objective2',
            description: 'obj desc2',
            quantity: 200,
            currentAmount: 120,
            unit: 'euros',
          },
        ],
      };
      mockService.getActionById.mockResolvedValueOnce(right(domainData));
      await expect(controller.getActionById('1')).resolves.toEqual(expectedDto);
      expect(mockService.getActionById).toHaveBeenCalledWith('1');
    });

    it('throws RepositoryException when service returns left(RepositoryException)', async () => {
      const err = new RepositoryException('invalid data');
      mockService.getActionById.mockResolvedValueOnce(left(err));
      await expect(controller.getActionById('1')).rejects.toThrow(err);
      expect(mockService.getActionById).toHaveBeenCalledWith('1');
    });

    it('throws EntityNotFoundError when service returns left(EntityNotFoundError)', async () => {
      const err = new EntityNotFoundError('Action', 'Not found');
      mockService.getActionById.mockResolvedValueOnce(left(err));
      await expect(controller.getActionById('999')).rejects.toThrow(err);
      expect(mockService.getActionById).toHaveBeenCalledWith('999');
    });
  });
});
