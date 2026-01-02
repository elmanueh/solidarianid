import { Test, TestingModule } from '@nestjs/testing';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { CommunitiesServiceImpl } from '@app/communities/application/services/communities.service.impl';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';

describe('CommunitiesServiceImpl', () => {
  let service: CommunitiesServiceImpl;
  let mockRepo: { findAll: jest.Mock; findById: jest.Mock };

  beforeEach(async () => {
    mockRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunitiesServiceImpl, { provide: CommunitiesRepositoryPort, useValue: mockRepo }],
    }).compile();

    service = module.get<CommunitiesServiceImpl>(CommunitiesServiceImpl);
  });

  it('returns empty array when repository returns []', async () => {
    mockRepo.findAll.mockResolvedValueOnce(right([]));
    await expect(service.getCommunities()).resolves.toEqual(right([]));
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns summaries when repository returns data', async () => {
    const data = [
      { id: '1', name: 'Comunidad 1', description: 'Esta es la comunidad 1' },
      { id: '2', name: 'Comunidad 2', description: 'Esta es la comunidad 2' },
    ];
    mockRepo.findAll.mockResolvedValueOnce(right(data));
    await expect(service.getCommunities()).resolves.toEqual(right(data));
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('propagates ValidationError from repository', async () => {
    const err = new ValidationError('invalid repo data');
    mockRepo.findAll.mockResolvedValueOnce(left(err));
    await expect(service.getCommunities()).resolves.toEqual(left(err));
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });
});
