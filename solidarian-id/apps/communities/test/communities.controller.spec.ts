import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesController } from '../src/infrastructure/presentation/controllers/communities.controller';
import { CommunitiesService } from '../src/domain/services/communities.service';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

describe('CommunitiesController', () => {
  let controller: CommunitiesController;
  let mockService: { getCommunities: jest.Mock };

  beforeEach(async () => {
    mockService = { getCommunities: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunitiesController],
      providers: [{ provide: CommunitiesService, useValue: mockService }],
    }).compile();

    controller = module.get<CommunitiesController>(CommunitiesController);
  });

  it('returns [] when repository returns empty array', async () => {
    mockService.getCommunities.mockResolvedValueOnce(right([]));
    await expect(controller.getPublicCommunities()).resolves.toEqual([]);
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
    await expect(controller.getPublicCommunities()).resolves.toEqual(
      expectedDtos,
    );
    expect(mockService.getCommunities).toHaveBeenCalledTimes(1);
  });

  it('throws ValidationError when service returns left(ValidationError)', async () => {
    const err = new ValidationError('invalid data');
    mockService.getCommunities.mockResolvedValueOnce(left(err));
    await expect(controller.getPublicCommunities()).rejects.toThrow(err);
    expect(mockService.getCommunities).toHaveBeenCalledTimes(1);
  });
});
