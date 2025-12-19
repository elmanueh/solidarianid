import { Test, TestingModule } from '@nestjs/testing';
import { right } from '@app/ddd/either';
import { CommunitiesServiceImpl } from '../src/application/services/communities.service.impl';
import { CommunitiesRepositoryPort } from '../src/domain/ports/communities.repository.port';

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
        { provide: CommunitiesRepositoryPort, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<CommunitiesServiceImpl>(CommunitiesServiceImpl);
  });

  it('returns empty array when repository returns []', async () => {
    mockRepo.getAllCommunitiesSummary.mockResolvedValueOnce(right([]));
    await expect(service.getCommunities()).resolves.toEqual(right([]));
    expect(mockRepo.getAllCommunitiesSummary).toHaveBeenCalledTimes(1);
  });

  it('returns summaries when repository returns data', async () => {
    const data = [
      { id: '1', name: 'Comunidad 1', description: 'Esta es la comunidad 1' },
      { id: '2', name: 'Comunidad 2', description: 'Esta es la comunidad 2' },
    ];
    mockRepo.getAllCommunitiesSummary.mockResolvedValueOnce(right(data));
    await expect(service.getCommunities()).resolves.toEqual(right(data));
    expect(mockRepo.getAllCommunitiesSummary).toHaveBeenCalledTimes(1);
  });
});
