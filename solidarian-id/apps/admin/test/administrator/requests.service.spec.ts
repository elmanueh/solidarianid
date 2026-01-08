/* eslint-disable @typescript-eslint/unbound-method */
import { RequestsServiceImpl } from '@app/admin/administrator/model/application/services/requests.service.impl';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { RequestInvalidStatusError } from '@app/admin/administrator/model/domain/errors/invalid-status.request-error';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { RequestsPublisherPort } from '@app/admin/administrator/model/domain/ports/output/request.publisher.port';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { ActionRequestEventDto, CauseRequestEventDto, CommunityRequestEventDto } from '@solidarianid/kafka';
import { Test, TestingModule } from '@nestjs/testing';

const createMockRequestsRepository = (): jest.Mocked<RequestsRepositoryPort> => ({
  save: jest.fn(),
  remove: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findPendingCommunityRequests: jest.fn(),
  findPendingCauseRequests: jest.fn(),
  findPendingActionRequests: jest.fn(),
});

const createMockCommunityRequestEventDto = (
  overrides?: Partial<CommunityRequestEventDto>,
): CommunityRequestEventDto => ({
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Test Community',
  description: 'A valid test community description for testing purposes',
  status: RequestStatus.PENDING,
  userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
  causeRequests: [
    {
      name: 'Test Cause',
      description: 'A valid test cause description for testing purposes',
      status: RequestStatus.PENDING,
      ods: [SustainableDevelopmentGoal.NoPoverty],
      initialDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      durationDays: 30,
    },
  ],
  type: RequestType.COMMUNITY,
  ...overrides,
});

const createMockCauseRequestEventDto = (overrides?: Partial<CauseRequestEventDto>): CauseRequestEventDto => ({
  id: '660e8400-e29b-41d4-a716-446655440001',
  name: 'Test Cause',
  description: 'A valid test cause description for testing purposes',
  status: RequestStatus.PENDING,
  userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
  communityId: '550e8400-e29b-41d4-a716-446655440000',
  ods: [SustainableDevelopmentGoal.ZeroHunger],
  initialDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  durationDays: 15,
  type: RequestType.CAUSE,
  ...overrides,
});

const createMockActionRequestEventDto = (overrides?: Partial<ActionRequestEventDto>): ActionRequestEventDto => ({
  id: '770e8400-e29b-41d4-a716-446655440002',
  name: 'Test Action',
  description: 'A valid test action description for testing purposes',
  status: RequestStatus.PENDING,
  userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
  causeId: '660e8400-e29b-41d4-a716-446655440001',
  objectives: [
    {
      name: 'Collect Food',
      description: 'Collect food donations',
      quantity: 100,
      unit: 'kg',
    },
  ],
  events: [
    {
      name: 'Food Collection Event',
      description: 'Event to collect food',
      initialDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      place: {
        direction: '123 Main Street',
        city: 'Madrid',
        countryCode: 'ES',
      },
    },
  ],
  type: RequestType.ACTION,
  ...overrides,
});

const createMockRequests = (): Request<any>[] => {
  const request1Result = CauseRequest.reconstitute({
    id: '2db201c8-5d35-462e-a1d1-985cb677725d',
    name: 'Environmental Conservation Request',
    description: 'Comprehensive environmental initiative',
    status: RequestStatus.PENDING,
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 30,
    userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
    ods: [SustainableDevelopmentGoal.NoPoverty],
    actions: [],
    communityId: '1db201c8-5d35-462e-a1d1-985cb677725c',
  });

  if (request1Result.isLeft()) throw new Error('Failed to create mock request 1');

  const request2Result = CauseRequest.reconstitute({
    id: '3db201c8-5d35-462e-a1d1-985cb677725e',
    name: 'Hunger Relief Initiative',
    description: 'Detailed hunger program',
    status: RequestStatus.APPROVED,
    reason: 'Meets all criteria and aligns with organizational goals',
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 15,
    userId: '4d8cd85d-db4b-4705-9727-72355583a5ce',
    ods: [SustainableDevelopmentGoal.ZeroHunger],
    actions: [],
    communityId: '1db201c8-5d35-462e-a1d1-985cb677725c',
  });

  if (request2Result.isLeft()) throw new Error('Failed to create mock request 2');

  const pendingCauseResult = CauseRequest.reconstitute({
    id: '4db201c8-5d35-462e-a1d1-985cb677725f',
    name: 'Pending Cause for Testing',
    description: 'A cause that is pending for testing purposes',
    status: RequestStatus.PENDING,
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 20,
    userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
    ods: [SustainableDevelopmentGoal.QualityEducation],
    actions: [],
    communityId: '1db201c8-5d35-462e-a1d1-985cb677725c',
  });

  if (pendingCauseResult.isLeft()) throw new Error('Failed to create pending cause');

  const communnityRequest = CommunityRequest.reconstitute({
    id: '1db201c8-5d35-462e-a1d1-985cb677725c',
    name: 'Community Development Request',
    description: 'A detailed community development plan',
    status: RequestStatus.PENDING,
    userId: 'a3f1c2d4-e5f6-4789-abcd-1234567890ab',
    causes: [pendingCauseResult.value],
  });

  if (communnityRequest.isLeft()) throw new Error('Failed to create mock community request');

  return [request1Result.value, request2Result.value, communnityRequest.value];
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
          expect(result.value.name).toBe(RequestInvalidStatusError.name);
        }
      });

      it('Path 3: should approve request when status is APPROVED and request is PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[2]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(requestId, RequestStatus.APPROVED, 'Looks good');

        expect(result.isRight()).toBe(true);
        expect(result.value).toBeUndefined();
      });

      it('Path 4: should reject request when status is REJECTED and request is PENDING', async () => {
        mockRepository.findById.mockResolvedValue(right(mockRequests[2]));
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(requestId, RequestStatus.REJECTED, 'Does not meet requirements');

        expect(result.isRight()).toBe(true);
        expect(result.value).toBeUndefined();
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
          expect(result.value).toBeInstanceOf(RequestInvalidStatusError);
          expect(result.value.message).toContain(id);
        }
      });

      it('should return Right(undefined) when request is successfully approved', async () => {
        // For CauseRequest, the service also checks if the parent community is APPROVED
        const approvedCommunity = CommunityRequest.reconstitute({
          id: '1db201c8-5d35-462e-a1d1-985cb677725c',
          name: 'Approved Community',
          description: 'An approved community',
          status: RequestStatus.APPROVED,
          userId: 'a3f1c2d4-e5f6-4789-abcd-1234567890ab',
          causes: [],
        });
        if (approvedCommunity.isLeft()) throw new Error('Failed to create approved community');

        mockRepository.findById.mockImplementation((id: string) => {
          if (id === requestId) return Promise.resolve(right(mockRequests[0]));
          if (id === '1db201c8-5d35-462e-a1d1-985cb677725c') return Promise.resolve(right(approvedCommunity.value));
          return Promise.resolve(left(new EntityNotFoundException('Request', id)));
        });
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(requestId, RequestStatus.APPROVED);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBeUndefined();
        }
      });

      it('should return Right(undefined) when request is successfully rejected', async () => {
        // For CauseRequest, the service also checks if the parent community is APPROVED
        const approvedCommunity = CommunityRequest.reconstitute({
          id: '1db201c8-5d35-462e-a1d1-985cb677725c',
          name: 'Approved Community',
          description: 'An approved community',
          status: RequestStatus.APPROVED,
          userId: 'a3f1c2d4-e5f6-4789-abcd-1234567890ab',
          causes: [],
        });
        if (approvedCommunity.isLeft()) throw new Error('Failed to create approved community');

        mockRepository.findById.mockImplementation((id: string) => {
          if (id === requestId) return Promise.resolve(right(mockRequests[0]));
          if (id === '1db201c8-5d35-462e-a1d1-985cb677725c') return Promise.resolve(right(approvedCommunity.value));
          return Promise.resolve(left(new EntityNotFoundException('Request', id)));
        });
        mockRepository.save.mockResolvedValue(right(undefined));

        const result = await service.updateStatus(requestId, RequestStatus.REJECTED, 'Invalid data');

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value).toBeUndefined();
        }
      });
    });
  });

  describe('createRequest', () => {
    describe('Basic Path Testing (Cyclomatic Complexity)', () => {
      it('Path 1: should return left with error when buildRequest fails for COMMUNITY type (result.isLeft = true)', async () => {
        // Arrange
        const invalidCommunityDto = createMockCommunityRequestEventDto({
          causeRequests: [], // Invalid: must have at least one cause
        });

        // Act
        const result = await service.createRequest(invalidCommunityDto);

        // Assert
        expect(result.isLeft()).toBe(true);
      });

      it('Path 2: should return left with error when repository.save fails (res.isLeft = true)', async () => {
        // Arrange
        const communityDto = createMockCommunityRequestEventDto();
        const repositoryError = new RepositoryException('Failed to save');
        mockRepository.save.mockResolvedValue(left(repositoryError));

        // Act
        const result = await service.createRequest(communityDto);

        // Assert
        expect(result.isLeft()).toBe(true);
      });

      it('Path 3: should return right with request when buildRequest and save succeed', async () => {
        // Arrange
        const communityDto = createMockCommunityRequestEventDto();
        mockRepository.save.mockResolvedValue(right(undefined));

        // Act
        const result = await service.createRequest(communityDto);

        // Assert
        expect(result.isRight()).toBe(true);
      });
    });

    describe('Condition Testing - Request Type Switch', () => {
      describe('when type is COMMUNITY', () => {
        it('then should create a CommunityRequest successfully', async () => {
          // Arrange
          const communityDto = createMockCommunityRequestEventDto();
          mockRepository.save.mockResolvedValue(right(undefined));

          // Act
          const result = await service.createRequest(communityDto);

          // Assert
          expect(result.isRight()).toBe(true);
        });

        it('then should return CommunityRequest instance', async () => {
          // Arrange
          const communityDto = createMockCommunityRequestEventDto();
          mockRepository.save.mockResolvedValue(right(undefined));

          // Act
          const result = await service.createRequest(communityDto);

          // Assert
          if (result.isRight()) {
            expect(result.value).toBeInstanceOf(CommunityRequest);
          }
        });

        it('then should return error when causes array is empty', async () => {
          // Arrange
          const invalidDto = createMockCommunityRequestEventDto({
            causeRequests: [],
          });

          // Act
          const result = await service.createRequest(invalidDto);

          // Assert
          expect(result.isLeft()).toBe(true);
        });
      });

      describe('when type is CAUSE', () => {
        it('then should return error when communityId is not found', async () => {
          // Arrange
          const causeDto = createMockCauseRequestEventDto();
          mockRepository.findById.mockResolvedValue(
            left(new EntityNotFoundException('CommunityRequest', causeDto.communityId)),
          );

          // Act
          const result = await service.createRequest(causeDto);

          // Assert
          expect(result.isLeft()).toBe(true);
        });

        it('then should call repository.findById with communityId', async () => {
          // Arrange
          const causeDto = createMockCauseRequestEventDto();
          const mockCommunity = CommunityRequest.create({
            name: 'Test Community',
            description: 'A valid community description for testing',
            userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
            causes: [
              {
                name: 'Existing Cause',
                description: 'A valid cause description for testing',
                ods: [SustainableDevelopmentGoal.NoPoverty],
                startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
                duration: 30,
                userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
              },
            ],
          });
          if (mockCommunity.isRight()) {
            mockRepository.findById.mockResolvedValue(right(mockCommunity.value));
            mockRepository.save.mockResolvedValue(right(undefined));
          }

          // Act
          await service.createRequest(causeDto);

          // Assert
          expect(mockRepository.findById).toHaveBeenCalledWith(causeDto.communityId);
        });
      });

      describe('when type is ACTION', () => {
        it('then should call repository.findById with causeId', async () => {
          // Arrange
          const actionDto = createMockActionRequestEventDto();
          const mockCauseResult = CauseRequest.create({
            name: 'Test Cause',
            description: 'A valid cause description for testing',
            userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
            ods: [SustainableDevelopmentGoal.ZeroHunger],
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            duration: 15,
            communityId: '550e8400-e29b-41d4-a716-446655440000',
          });
          if (mockCauseResult.isRight()) {
            mockRepository.findById.mockResolvedValue(right(mockCauseResult.value));
            mockRepository.save.mockResolvedValue(right(undefined));
          }

          // Act
          await service.createRequest(actionDto);

          // Assert
          expect(mockRepository.findById).toHaveBeenCalledWith(actionDto.causeId);
        });

        it('then should return error when causeId format is invalid', async () => {
          // Arrange
          const actionDto = createMockActionRequestEventDto({
            causeId: 'invalid-uuid-format',
          });

          // Act
          const result = await service.createRequest(actionDto);

          // Assert
          expect(result.isLeft()).toBe(true);
        });

        it('then should add action to cause and return the cause', async () => {
          // Arrange
          const actionDto = createMockActionRequestEventDto();
          const mockCauseResult = CauseRequest.create({
            name: 'Test Cause',
            description: 'A valid cause description for testing',
            userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
            ods: [SustainableDevelopmentGoal.ZeroHunger],
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            duration: 15,
            communityId: '550e8400-e29b-41d4-a716-446655440000',
          });
          if (mockCauseResult.isRight()) {
            mockRepository.findById.mockResolvedValue(right(mockCauseResult.value));
            mockRepository.save.mockResolvedValue(right(undefined));
          }

          // Act
          const result = await service.createRequest(actionDto);

          // Assert
          expect(result.isRight()).toBe(true);
        });
      });

      describe('when type is unsupported', () => {
        it('then should return left with RequestError', async () => {
          // Arrange
          const invalidDto = createMockCommunityRequestEventDto({
            type: 'INVALID_TYPE' as RequestType,
          });

          // Act
          const result = await service.createRequest(invalidDto);

          // Assert
          expect(result.isLeft()).toBe(true);
        });
      });
    });

    describe('Repository Interaction Testing', () => {
      it('should call repository.save with the created request', async () => {
        // Arrange
        const communityDto = createMockCommunityRequestEventDto();
        mockRepository.save.mockResolvedValue(right(undefined));

        // Act
        await service.createRequest(communityDto);

        // Assert
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
      });

      it('should not call repository.save when buildRequest fails', async () => {
        // Arrange
        const invalidDto = createMockCommunityRequestEventDto({
          causeRequests: [],
        });

        // Act
        await service.createRequest(invalidDto);

        // Assert
        expect(mockRepository.save).not.toHaveBeenCalled();
      });

      it('should return repository error when save fails', async () => {
        // Arrange
        const communityDto = createMockCommunityRequestEventDto();
        const repositoryError = new RepositoryException('Database connection failed');
        mockRepository.save.mockResolvedValue(left(repositoryError));

        // Act
        const result = await service.createRequest(communityDto);

        // Assert
        if (result.isLeft()) {
          expect(result.value).toBe(repositoryError);
        }
      });
    });

    describe('Return Value Testing', () => {
      it('should return Right with CommunityRequest when COMMUNITY type succeeds', async () => {
        // Arrange
        const communityDto = createMockCommunityRequestEventDto();
        mockRepository.save.mockResolvedValue(right(undefined));

        // Act
        const result = await service.createRequest(communityDto);

        // Assert
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          expect(result.value.name).toBe(communityDto.name);
        }
      });

      it('should return request with correct description', async () => {
        // Arrange
        const communityDto = createMockCommunityRequestEventDto();
        mockRepository.save.mockResolvedValue(right(undefined));

        // Act
        const result = await service.createRequest(communityDto);

        // Assert
        if (result.isRight()) {
          expect(result.value.description).toBe(communityDto.description);
        }
      });

      it('should return request with PENDING status', async () => {
        // Arrange
        const communityDto = createMockCommunityRequestEventDto();
        mockRepository.save.mockResolvedValue(right(undefined));

        // Act
        const result = await service.createRequest(communityDto);

        // Assert
        if (result.isRight()) {
          expect(result.value.status).toBe(RequestStatus.PENDING);
        }
      });
    });

    describe('Edge Cases', () => {
      it('should handle community with multiple causes', async () => {
        // Arrange
        const communityDto = createMockCommunityRequestEventDto({
          causeRequests: [
            {
              name: 'Cause 1',
              description: 'First cause description for testing',
              status: RequestStatus.PENDING,
              ods: [SustainableDevelopmentGoal.NoPoverty],
              initialDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
              durationDays: 30,
            },
            {
              name: 'Cause 2',
              description: 'Second cause description for testing',
              status: RequestStatus.PENDING,
              ods: [SustainableDevelopmentGoal.ZeroHunger],
              initialDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
              durationDays: 15,
            },
          ],
        });
        mockRepository.save.mockResolvedValue(right(undefined));

        // Act
        const result = await service.createRequest(communityDto);

        // Assert
        expect(result.isRight()).toBe(true);
      });

      it('should handle action with multiple objectives', async () => {
        // Arrange
        const actionDto = createMockActionRequestEventDto({
          objectives: [
            {
              name: 'Objective 1',
              description: 'First objective for food collection',
              quantity: 50,
              unit: 'kg',
            },
            {
              name: 'Objective 2',
              description: 'Second objective for item distribution',
              quantity: 100,
              unit: 'units',
            },
          ],
        });
        const mockCause = CauseRequest.create({
          name: 'Test Cause',
          description: 'A valid cause description for testing',
          userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
          ods: [SustainableDevelopmentGoal.ZeroHunger],
          startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          duration: 15,
          communityId: '550e8400-e29b-41d4-a716-446655440000',
        });
        if (mockCause.isRight()) {
          mockRepository.findById.mockResolvedValue(right(mockCause.value));
          mockRepository.save.mockResolvedValue(right(undefined));
        }

        // Act
        const result = await service.createRequest(actionDto);

        // Assert
        expect(result.isRight()).toBe(true);
      });

      it('should handle action with multiple events', async () => {
        // Arrange
        const actionDto = createMockActionRequestEventDto({
          events: [
            {
              name: 'Event 1',
              description: 'First event description for food collection event',
              initialDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
              place: { direction: '123 Street', city: 'Madrid', countryCode: 'ES' },
            },
            {
              name: 'Event 2',
              description: 'Second event description for charity distribution',
              initialDate: new Date(Date.now() + 72 * 60 * 60 * 1000),
              place: { direction: '456 Avenue', city: 'Barcelona', countryCode: 'ES' },
            },
          ],
        });
        const mockCause = CauseRequest.create({
          name: 'Test Cause',
          description: 'A valid cause description for testing',
          userId: '04a6ba1e-5b2b-4765-b46b-5f07a52b4b60',
          ods: [SustainableDevelopmentGoal.ZeroHunger],
          startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          duration: 15,
          communityId: '550e8400-e29b-41d4-a716-446655440000',
        });
        if (mockCause.isRight()) {
          mockRepository.findById.mockResolvedValue(right(mockCause.value));
          mockRepository.save.mockResolvedValue(right(undefined));
        }

        // Act
        const result = await service.createRequest(actionDto);

        // Assert
        expect(result.isRight()).toBe(true);
      });
    });
  });
});
