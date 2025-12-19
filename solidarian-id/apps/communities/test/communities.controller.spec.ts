import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesController } from '../src/infrastructure/presentation/controllers/communities.controller';
import { CommunitiesServiceImpl } from '../src/application/services/communities.service.impl';
import { CommunitiesRepository } from '../src/domain/ports/communities.repository';
import { CommunitiesService } from '../src/domain/services/communities.service';

describe('CommunitiesController', () => {
  let controller: CommunitiesController;
  let mockRepo: { getAllCommunitiesSummary: jest.Mock };

  beforeEach(async () => {
    mockRepo = { getAllCommunitiesSummary: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunitiesController],
      providers: [
        { provide: CommunitiesService, useClass: CommunitiesServiceImpl },
        { provide: CommunitiesRepository, useValue: mockRepo },
      ],
    }).compile();

    controller = module.get<CommunitiesController>(CommunitiesController);
  });

  it('returns [] when repository returns empty array', async () => {
    mockRepo.getAllCommunitiesSummary.mockResolvedValueOnce({
      isLeft: () => false,
      value: [],
    });
    await expect(controller.getPublicCommunities()).resolves.toEqual([]);
    expect(mockRepo.getAllCommunitiesSummary).toHaveBeenCalledTimes(1);
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
    mockRepo.getAllCommunitiesSummary.mockResolvedValueOnce({
      isLeft: () => false,
      value: domainData,
    });
    await expect(controller.getPublicCommunities()).resolves.toEqual(
      expectedDtos,
    );
    expect(mockRepo.getAllCommunitiesSummary).toHaveBeenCalledTimes(1);
  });
});
