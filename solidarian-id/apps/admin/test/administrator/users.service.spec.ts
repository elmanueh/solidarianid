/* eslint-disable @typescript-eslint/unbound-method */
import { UsersServiceImpl } from '@app/admin/administrator/model/application/services/users.service.impl';
import { User } from '@app/admin/administrator/model/domain/models/user';
import {
  PaginatedResult,
  UserRepositoryPort,
} from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/user-query.repository.port';

const createMockUserRepository = (): jest.Mocked<UserRepositoryPort> => ({
  findPaginated: jest.fn(),
  findById: jest.fn(),
  countAll: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  findAll: jest.fn(),
});

const createMockUsers = (): User[] => {
  const user1Result = User.reconstitute({
    id: '550e8400-e29b-41d4-a716-446655440000',
    fullName: 'Juan Pérez',
    username: 'juan_perez',
    phone: '+34612345678',
    city: 'Madrid',
    countryCode: 'ES',
    communityMemberships: [
      {
        communityId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        communityName: 'Volunteers Spain',
        isAdmin: true,
      },
      {
        communityId: '6ba7b810-9dad-11d1-80b4-00c04fd430c9',
        communityName: 'Green Initiative',
        isAdmin: false,
      },
    ],
  });

  const user2Result = User.reconstitute({
    id: '550e8400-e29b-41d4-a716-446655440001',
    fullName: 'María López',
    username: 'maria_lopez',
    phone: '+52155123456',
    city: 'Ciudad de México',
    countryCode: 'MX',
    communityMemberships: [
      {
        communityId: '6ba7b810-9dad-11d1-80b4-00c04fd430d0',
        communityName: 'Mexico Relief',
        isAdmin: false,
      },
    ],
  });

  const user3Result = User.reconstitute({
    id: '550e8400-e29b-41d4-a716-446655440002',
    fullName: 'Carlos García',
    username: 'carlos_garcia',
    phone: '+541145678910',
    city: 'Buenos Aires',
    countryCode: 'AR',
    communityMemberships: [],
  });

  if (user1Result.isLeft()) {
    throw new Error(`Failed to create mock user 1: ${user1Result.value.message}`);
  }

  if (user2Result.isLeft()) {
    throw new Error(`Failed to create mock user 2: ${user2Result.value.message}`);
  }

  if (user3Result.isLeft()) {
    throw new Error(`Failed to create mock user 3: ${user3Result.value.message}`);
  }

  return [user1Result.value, user2Result.value, user3Result.value];
};

describe('UsersService', () => {
  let service: UsersServiceImpl;
  let mockRepository: jest.Mocked<UserRepositoryPort>;
  let mockUsers: User[];
  const userId = '550e8400-e29b-41d4-a716-446655440000';
  const nonExistentUserId = '550e8400-e29b-41d4-a716-446655440099';

  beforeEach(async () => {
    mockUsers = createMockUsers();
    mockRepository = createMockUserRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersServiceImpl,
        {
          provide: UserRepositoryPort,
          useValue: mockRepository,
        },
        {
          provide: UserQueryRepositoryPort,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersServiceImpl>(UsersServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPaginatedUsers', () => {
    describe('Basic Path Testing', () => {
      it('Path 1: should return left with RepositoryException when repository returns error', async () => {
        const error = new RepositoryException('Database connection failed');
        mockRepository.findPaginated.mockResolvedValue(left(error));

        const result = await service.getPaginatedUsers(1, 6);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBe(error);
          expect(result.value.name).toBe(RepositoryException.name);
        }
      });

      it('Path 2: should return right with paginated users when repository succeeds', async () => {
        const paginatedResult: PaginatedResult<User> = {
          data: [mockUsers[0], mockUsers[1]],
          page: 1,
          limit: 6,
          total: 10,
          totalPages: 2,
        };
        mockRepository.findPaginated.mockResolvedValue(right(paginatedResult));

        const result = await service.getPaginatedUsers(1, 6);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value.data).toHaveLength(2);
          expect(result.value.page).toBe(1);
          expect(result.value.limit).toBe(6);
          expect(result.value.total).toBe(10);
          expect(result.value.totalPages).toBe(2);
        }
      });
    });

    describe('Condition Testing', () => {
      it('should handle result.isLeft() = true', async () => {
        const error = new RepositoryException('Query timeout');
        mockRepository.findPaginated.mockResolvedValue(left(error));

        const result = await service.getPaginatedUsers(1, 6);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBeInstanceOf(RepositoryException);
        }
      });

      it('should handle result.isLeft() = false', async () => {
        const paginatedResult: PaginatedResult<User> = {
          data: mockUsers,
          page: 1,
          limit: 6,
          total: 3,
          totalPages: 1,
        };
        mockRepository.findPaginated.mockResolvedValue(right(paginatedResult));

        const result = await service.getPaginatedUsers(1, 6);

        expect(result.isLeft()).toBe(false);
        expect(result.isRight()).toBe(true);
      });
    });

    describe('Return Value Testing', () => {
      it('should return Left when repository.findPaginated returns Left', async () => {
        const error = new RepositoryException('Network error');
        mockRepository.findPaginated.mockResolvedValue(left(error));

        const result = await service.getPaginatedUsers(1, 6);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBe(error);
        }
      });

      it('should return Right(PaginatedResult) when repository succeeds', async () => {
        const expectedResult: PaginatedResult<User> = {
          data: mockUsers,
          page: 1,
          limit: 6,
          total: 3,
          totalPages: 1,
        };
        mockRepository.findPaginated.mockResolvedValue(right(expectedResult));

        const result = await service.getPaginatedUsers(1, 6);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toEqual(expectedResult);
        }
      });

      it('should preserve user data structure in paginated result', async () => {
        const paginatedResult: PaginatedResult<User> = {
          data: [mockUsers[0]],
          page: 1,
          limit: 6,
          total: 1,
          totalPages: 1,
        };
        mockRepository.findPaginated.mockResolvedValue(right(paginatedResult));

        const result = await service.getPaginatedUsers(1, 6);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          const user = result.value.data[0];
          expect(user.username).toBe('juan_perez');
          expect(user.phone).toBe('+34612345678');
          expect(user.city).toBe('Madrid');
          expect(user.countryCode).toBe('ES');
        }
      });
    });

    describe('Repository Method Call Verification', () => {
      it('should call repository.findPaginated with correct parameters', async () => {
        const paginatedResult: PaginatedResult<User> = {
          data: [],
          page: 1,
          limit: 6,
          total: 0,
          totalPages: 0,
        };
        mockRepository.findPaginated.mockResolvedValue(right(paginatedResult));

        await service.getPaginatedUsers(1, 6);

        expect(mockRepository.findPaginated).toHaveBeenCalledWith(1, 6);
        expect(mockRepository.findPaginated).toHaveBeenCalledTimes(1);
      });

      it('should call repository.findPaginated with different page numbers', async () => {
        const paginatedResult: PaginatedResult<User> = {
          data: [],
          page: 3,
          limit: 6,
          total: 0,
          totalPages: 0,
        };
        mockRepository.findPaginated.mockResolvedValue(right(paginatedResult));

        await service.getPaginatedUsers(3, 6);

        expect(mockRepository.findPaginated).toHaveBeenCalledWith(3, 6);
      });
    });
  });

  describe('getUserById', () => {
    describe('Basic Path Testing', () => {
      it('Path 1: should return left with error when repository returns Left', async () => {
        const error = new EntityNotFoundException('User', userId);
        mockRepository.findById.mockResolvedValue(left(error));

        const result = await service.getUserById(userId);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBe(error);
        }
      });

      it('Path 2: should return right with user when repository finds user', async () => {
        mockRepository.findById.mockResolvedValue(right(mockUsers[0]));

        const result = await service.getUserById(userId);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBe(mockUsers[0]);
          expect(result.value.id.value).toBe(userId);
        }
      });
    });

    describe('Condition Testing', () => {
      it('should handle result.isLeft() = true', async () => {
        const error = new EntityNotFoundException('User', nonExistentUserId);
        mockRepository.findById.mockResolvedValue(left(error));

        const result = await service.getUserById(nonExistentUserId);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBeInstanceOf(EntityNotFoundException);
        }
      });

      it('should handle result.isLeft() = false', async () => {
        mockRepository.findById.mockResolvedValue(right(mockUsers[0]));

        const result = await service.getUserById(userId);

        expect(result.isLeft()).toBe(false);
        expect(result.isRight()).toBe(true);
      });
    });

    describe('Return Value Testing', () => {
      it('should return Left when repository.findById returns Left', async () => {
        const error = new EntityNotFoundException('User', userId);
        mockRepository.findById.mockResolvedValue(left(error));

        const result = await service.getUserById(userId);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBe(error);
        }
      });

      it('should return Right(User) when repository finds user', async () => {
        mockRepository.findById.mockResolvedValue(right(mockUsers[0]));

        const result = await service.getUserById(userId);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBe(mockUsers[0]);
        }
      });

      it('should preserve complete user data structure', async () => {
        mockRepository.findById.mockResolvedValue(right(mockUsers[0]));

        const result = await service.getUserById(userId);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          const user = result.value;
          expect(user.id.value).toBe(userId);
          expect(user.username).toBe('juan_perez');
          expect(user.phone).toBe('+34612345678');
          expect(user.city).toBe('Madrid');
          expect(user.countryCode).toBe('ES');
          expect(user.communityMemberships).toHaveLength(2);
        }
      });
    });

    describe('Repository Method Call Verification', () => {
      it('should call repository.findById with correct user ID', async () => {
        mockRepository.findById.mockResolvedValue(right(mockUsers[0]));

        await service.getUserById(userId);

        expect(mockRepository.findById).toHaveBeenCalledWith(userId);
        expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      });

      it('should call repository.findById with different user IDs', async () => {
        const differentUserId = '550e8400-e29b-41d4-a716-446655440001';
        mockRepository.findById.mockResolvedValue(right(mockUsers[1]));

        await service.getUserById(differentUserId);

        expect(mockRepository.findById).toHaveBeenCalledWith(differentUserId);
      });
    });
  });

  describe('getTotalUsers', () => {
    describe('Basic Path Testing', () => {
      it('Path 1: should return right with total count from repository', async () => {
        mockRepository.countAll.mockResolvedValue(right(10));

        const result = await service.getTotalUsers();

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBe(10);
        }
      });

      it('Path 2: should return left with error when repository fails', async () => {
        const error = new RepositoryException('Database connection failed');
        mockRepository.countAll.mockResolvedValue(left(error));

        const result = await service.getTotalUsers();

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBe(error);
        }
      });
    });

    describe('Return Value Testing', () => {
      it('should return Right with number from repository.countAll', async () => {
        const expectedCount = 42;
        mockRepository.countAll.mockResolvedValue(right(expectedCount));

        const result = await service.getTotalUsers();

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBe(expectedCount);
          expect(typeof result.value).toBe('number');
        }
      });

      it('should return Left when repository.countAll returns error', async () => {
        const error = new RepositoryException('Database error');
        mockRepository.countAll.mockResolvedValue(left(error));

        const result = await service.getTotalUsers();

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBe(error);
        }
      });
    });

    describe('Repository Method Call Verification', () => {
      it('should call repository.countAll without parameters', async () => {
        mockRepository.countAll.mockResolvedValue(right(10));

        await service.getTotalUsers();

        expect(mockRepository.countAll).toHaveBeenCalledWith();
        expect(mockRepository.countAll).toHaveBeenCalledTimes(1);
      });
    });
  });
});
