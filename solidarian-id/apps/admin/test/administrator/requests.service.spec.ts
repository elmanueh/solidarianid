import { RequestsServiceImpl } from '@app/admin/administrator/model/application/services/requests.service.impl';
import { SustainableDevelopmentGoal } from '@app/admin/administrator/model/domain/enums/ods';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause.request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { RequestsPublisherPort } from '@app/admin/administrator/model/domain/ports/output/request.publisher.port';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { Test, TestingModule } from '@nestjs/testing';

const createMockRequestsRepository = (): jest.Mocked<RequestsRepositoryPort> => ({
  save: jest.fn(),
  remove: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
});

const createMockRequests = (): Request<any>[] => {
  const request1Result = CauseRequest.create(
    {
      name: 'Environmental Conservation Request',
      description: 'Comprehensive environmental initiative',
      status: RequestStatus.PENDING,
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      ods: [SustainableDevelopmentGoal.NoPoverty],
    },
    '2db201c8-5d35-462e-a1d1-985cb677725d',
  );

  const request2Result = CauseRequest.create(
    {
      name: 'Hunger Relief Initiative',
      description: 'Detailed hunger program',
      status: RequestStatus.APPROVED,
      reason: 'Meets all criteria and aligns with organizational goals',
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      ods: [SustainableDevelopmentGoal.ZeroHunger],
    },
    '3db201c8-5d35-462e-a1d1-985cb677725e',
  );

  if (request1Result.isLeft()) {
    throw new Error(`Failed to create mock request 1: ${request1Result.value.message}`);
  }

  if (request2Result.isLeft()) {
    throw new Error(`Failed to create mock request 2: ${request2Result.value.message}`);
  }

  return [request1Result.value, request2Result.value];
};

describe('RequestsService', () => {
  let service: RequestsServiceImpl;
  let mockRepository: jest.Mocked<RequestsRepositoryPort>;
  let mockRequests: Request<any>[];
  const requestId = '2db201c8-5d35-462e-a1d1-985cb677725d';

  beforeEach(async () => {
    mockRequests = createMockRequests();
    mockRepository = createMockRequestsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsServiceImpl,
        {
          provide: RequestsRepositoryPort,
          useValue: mockRepository,
        },
        {
          provide: RequestsPublisherPort,
          useValue: { publish: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RequestsServiceImpl>(RequestsServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateStatus', () => {
    describe('Basic Path Testing', () => {
      it('Path 1: should return left with error when request is not found (requestOrError.isLeft = true)', async () => {
        mockRepository.findById.mockResolvedValue(left(new EntityNotFoundException('Entity', requestId)));

        const result = await service.updateStatus(requestId, RequestStatus.APPROVED);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value.name).toBe(EntityNotFoundException.name);
        }
      });

      it('Path 2: should return left when request status is not PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[1]));

        const result = await service.updateStatus(requestId, RequestStatus.APPROVED);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value.name).toBe(RequestAlreadyResolvedError.name);
        }
      });

      it('Path 3: should approve request when status is APPROVED and request is PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[0]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(requestId, RequestStatus.APPROVED, 'Looks good');

        expect(result.isRight()).toBe(true);
        expect(result.value).toBeUndefined();
      });

      it('Path 4: should reject request when status is REJECTED and request is PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[0]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(requestId, RequestStatus.REJECTED, 'Does not meet requirements');

        expect(result.isRight()).toBe(true);
        expect(result.value).toBeUndefined();
      });
    });

    describe('Edge Cases', () => {
      it('should return RequestAlreadyResolvedException when request was previously approved', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[1]));

        const result = await service.updateStatus(requestId, RequestStatus.REJECTED, 'Try to reject');

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBeInstanceOf(RequestAlreadyResolvedError);
        }
      });

      it('should return RequestAlreadyResolvedException when request was previously rejected', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[1]));

        const result = await service.updateStatus(requestId, RequestStatus.APPROVED, 'Try to approve');

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBeInstanceOf(RequestAlreadyResolvedError);
        }
      });
    });

    describe('Return Value Testing', () => {
      it('should return Left when repository.findById returns Left', async () => {
        const error = new EntityNotFoundException('Request', requestId);
        mockRepository.findById.mockResolvedValue(left(error));

        const result = await service.updateStatus(requestId, RequestStatus.APPROVED);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBe(error);
        }
      });

      it('should return Left with RequestAlreadyResolvedException when request is not PENDING', async () => {
        const id = mockRequests[1].id.value;
        mockRepository.findById.mockResolvedValue(right(mockRequests[1]));

        const result = await service.updateStatus(id, RequestStatus.REJECTED, 'Too late');

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBeInstanceOf(RequestAlreadyResolvedError);
          expect(result.value.message).toContain(id);
        }
      });

      it('should return Right(undefined) when request is successfully approved', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[0]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(requestId, RequestStatus.APPROVED);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBeUndefined();
        }
      });

      it('should return Right(undefined) when request is successfully rejected', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[0]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(requestId, RequestStatus.REJECTED, 'Invalid data');

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBeUndefined();
        }
      });
    });
  });
});
