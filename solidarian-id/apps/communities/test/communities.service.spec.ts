import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesServiceImpl } from '../src/application/services/communities.service.impl';
import { CommunitiesRepository } from '../src/domain/ports/communities.repository';

describe('CommunitiesServiceImpl', () => {
  let service: CommunitiesServiceImpl;
  let mockRepo: { getAllCommunitiesSummary: jest.Mock };

  beforeEach(async () => {
    mockRepo = {
      getAllCommunitiesSummary: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunitiesServiceImpl,
        { provide: CommunitiesRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<CommunitiesServiceImpl>(CommunitiesServiceImpl);
  });

  it('returns empty array when repository returns []', async () => {
    mockRepo.getAllCommunitiesSummary.mockResolvedValueOnce({
      isLeft: () => false,
      value: [],
    });
    await expect(service.getCommunities()).resolves.toEqual([]);
    expect(mockRepo.getAllCommunitiesSummary).toHaveBeenCalledTimes(1);
  });

  it('returns summaries when repository returns data', async () => {
    const data = [
      { id: '1', name: 'Com1', description: 'desc1' },
      { id: '2', name: 'Com2', description: 'desc2' },
    ];
    mockRepo.getAllCommunitiesSummary.mockResolvedValueOnce({
      isLeft: () => false,
      value: data,
    });
    await expect(service.getCommunities()).resolves.toEqual(data);
    expect(mockRepo.getAllCommunitiesSummary).toHaveBeenCalledTimes(1);
  });
});
