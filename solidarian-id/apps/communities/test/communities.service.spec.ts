import { Test, TestingModule } from '@nestjs/testing';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { CommunitiesServiceImpl } from '@app/communities/application/services/communities.service.impl';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { CommunitiesQueryRepositoryPort } from '@app/communities/domain/ports/community-query.repository.port';
import { CommunitiesPublisherPort } from '@app/communities/domain/ports/communities.publisher.port';

describe('CommunitiesServiceImpl', () => {
  let service: CommunitiesServiceImpl;
  let mockCommunityRepo: { findAll: jest.Mock; findById: jest.Mock; save: jest.Mock };
  let mockUsersRepo: { findById: jest.Mock };
  let mockPublisher: { publish: jest.Mock };

  beforeEach(async () => {
    mockCommunityRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    mockUsersRepo = {
      findById: jest.fn(),
    };

    mockPublisher = {
      publish: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunitiesServiceImpl,
        { provide: CommunitiesRepositoryPort, useValue: mockCommunityRepo },
        { provide: CommunitiesQueryRepositoryPort, useValue: {} },
        { provide: UsersRepositoryPort, useValue: mockUsersRepo },
        { provide: CommunitiesPublisherPort, useValue: mockPublisher },
      ],
    }).compile();

    service = module.get<CommunitiesServiceImpl>(CommunitiesServiceImpl);
  });

  it('returns empty array when repository returns []', async () => {
    mockCommunityRepo.findAll.mockResolvedValueOnce(right([]));
    await expect(service.getCommunities()).resolves.toEqual(right([]));
    expect(mockCommunityRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns summaries when repository returns data', async () => {
    const data = [
      { id: '1', name: 'Comunidad 1', description: 'Esta es la comunidad 1' },
      { id: '2', name: 'Comunidad 2', description: 'Esta es la comunidad 2' },
    ];
    mockCommunityRepo.findAll.mockResolvedValueOnce(right(data));
    await expect(service.getCommunities()).resolves.toEqual(right(data));
    expect(mockCommunityRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('propagates ValidationError from repository', async () => {
    const err = new ValidationError('invalid repo data');
    mockCommunityRepo.findAll.mockResolvedValueOnce(left(err));
    await expect(service.getCommunities()).resolves.toEqual(left(err));
    expect(mockCommunityRepo.findAll).toHaveBeenCalledTimes(1);
  });
});
