import { RequestsServiceImpl } from '@app/admin/administrator/model/application/services/requests.service.impl';
import { SustainableDevelopmentGoal } from '@app/admin/administrator/model/domain/enums/ods';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import { RequestCause } from '@app/admin/administrator/model/domain/models/cause.request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port.';
import { left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { Description } from '@app/value-objects/model/description';
import { Duration } from '@app/value-objects/model/duration';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Test, TestingModule } from '@nestjs/testing';

const createMockRequestsRepository =
  (): jest.Mocked<RequestsRepositoryPort> => ({
    save: jest.fn(),
    remove: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
  });

const createMockRequests = (): Request<any>[] => [
  RequestCause.create(
    {
      name: 'Request 1',
      description: Description.create('Description 1').value as Description,
      status: RequestStatus.PENDING,
      duration: Duration.create(
        new Date(Date.now() + 24 * 60 * 60 * 1000),
        new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      ).value as Duration,
      ods: [SustainableDevelopmentGoal.NoPoverty],
    },
    UniqueEntityID.create('2db201c8-5d35-462e-a1d1-985cb677725d')
      .value as UniqueEntityID,
  ),
  RequestCause.create({
    name: 'Request 2',
    description: Description.create('Description 2').value as Description,
    status: RequestStatus.APPROVED,
    reason: 'Meets all criteria',
    duration: Duration.create(
      new Date(Date.now() + 24 * 60 * 60 * 1000),
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    ).value as Duration,
    ods: [SustainableDevelopmentGoal.ZeroHunger],
  }),
];

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
        mockRepository.findById.mockResolvedValue(
          left(new EntityNotFoundException('Entity', requestId)),
        );

        const result = await service.updateStatus(
          requestId,
          RequestStatus.APPROVED,
        );

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value.name).toBe(EntityNotFoundException.name);
        }
      });

      it('Path 2: should return left when request status is not PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[1]));

        const result = await service.updateStatus(
          requestId,
          RequestStatus.APPROVED,
        );

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value.name).toBe(RequestAlreadyResolvedError.name);
        }
      });

      it('Path 3: should approve request when status is APPROVED and request is PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[0]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(
          requestId,
          RequestStatus.APPROVED,
          'Looks good',
        );

        expect(result.isRight()).toBe(true);
        expect(result.value).toBeUndefined();
      });

      it('Path 4: should reject request when status is REJECTED and request is PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[0]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(
          requestId,
          RequestStatus.REJECTED,
          'Does not meet requirements',
        );

        expect(result.isRight()).toBe(true);
        expect(result.value).toBeUndefined();
      });
    });

    describe('Edge Cases', () => {
      it('should return RequestAlreadyResolvedException when request was previously approved', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[1]));

        const result = await service.updateStatus(
          requestId,
          RequestStatus.REJECTED,
          'Try to reject',
        );

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBeInstanceOf(RequestAlreadyResolvedError);
        }
      });

      it('should return RequestAlreadyResolvedException when request was previously rejected', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[1]));

        const result = await service.updateStatus(
          requestId,
          RequestStatus.APPROVED,
          'Try to approve',
        );

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

        const result = await service.updateStatus(
          requestId,
          RequestStatus.APPROVED,
        );

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBe(error);
        }
      });

      it('should return Left with RequestAlreadyResolvedException when request is not PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[1]));

        const result = await service.updateStatus(
          requestId,
          RequestStatus.REJECTED,
          'Too late',
        );

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value).toBeInstanceOf(RequestAlreadyResolvedError);
          expect(result.value.message).toContain(requestId);
        }
      });

      it('should return Right(undefined) when request is successfully approved', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[0]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(
          requestId,
          RequestStatus.APPROVED,
        );

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBeUndefined();
        }
      });

      it('should return Right(undefined) when request is successfully rejected', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[0]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(
          requestId,
          RequestStatus.REJECTED,
          'Invalid data',
        );

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBeUndefined();
        }
      });
    });
  });
});
