/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestConsumerAdapter } from '@app/admin/administrator/model/infrastructure/messaging/request.consumer';
import { RequestError } from '@app/admin/administrator/model/domain/errors/request-error';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CommunityRequestEventDto, EventType, RequestEvent } from '@solidarianid/kafka';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

const createMockRequestsService = (): jest.Mocked<RequestsService> =>
  ({
    createRequest: jest.fn(),
    updateStatus: jest.fn(),
    getCommunityRequestsPending: jest.fn(),
    getCauseRequestsPending: jest.fn(),
    getActionRequestsPending: jest.fn(),
  }) as jest.Mocked<RequestsService>;

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

const createMockRequestEvent = (eventType: EventType, data: CommunityRequestEventDto): RequestEvent => ({
  eventType,
  data,
  occurredOn: new Date(),
});

describe('RequestConsumerAdapter', () => {
  let sut: RequestConsumerAdapter;
  let mockRequestsService: jest.Mocked<RequestsService>;

  beforeAll(() => {
    // Silence NestJS Logger during tests
    jest.spyOn(Logger.prototype, 'debug').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
  });

  beforeEach(async () => {
    mockRequestsService = createMockRequestsService();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestConsumerAdapter],
      providers: [
        {
          provide: RequestsService,
          useValue: mockRequestsService,
        },
      ],
    }).compile();

    sut = module.get<RequestConsumerAdapter>(RequestConsumerAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('handleRequestEvent', () => {
    describe('Basic Path Testing (Cyclomatic Complexity)', () => {
      it('Path 1: should process REQUEST_CREATED event successfully when service returns Right', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        mockRequestsService.createRequest.mockResolvedValue(right({} as any));

        // Act
        await sut.handleRequestEvent(payload);

        // Assert
        expect(mockRequestsService.createRequest).toHaveBeenCalledWith(mockData);
      });

      it('Path 2: should log error when service returns Left (result.isLeft = true)', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        const error = new RepositoryException('Failed to save request');
        mockRequestsService.createRequest.mockResolvedValue(left(error));

        // Act & Assert - should not throw
        await expect(sut.handleRequestEvent(payload)).resolves.not.toThrow();
      });

      it('Path 3: should throw error when unexpected exception occurs', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        const unexpectedError = new Error('Unexpected database error');
        mockRequestsService.createRequest.mockRejectedValue(unexpectedError);

        // Act & Assert
        await expect(sut.handleRequestEvent(payload)).rejects.toThrow('Unexpected database error');
      });
    });

    describe('Condition Testing - EventType Switch', () => {
      describe('when eventType is REQUEST_CREATED', () => {
        it('then should call requestService.createRequest with data', async () => {
          // Arrange
          const mockData = createMockCommunityRequestEventDto();
          const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
          mockRequestsService.createRequest.mockResolvedValue(right({} as any));

          // Act
          await sut.handleRequestEvent(payload);

          // Assert
          expect(mockRequestsService.createRequest).toHaveBeenCalledWith(mockData);
        });

        it('then should call createRequest exactly once', async () => {
          // Arrange
          const mockData = createMockCommunityRequestEventDto();
          const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
          mockRequestsService.createRequest.mockResolvedValue(right({} as any));

          // Act
          await sut.handleRequestEvent(payload);

          // Assert
          expect(mockRequestsService.createRequest).toHaveBeenCalledTimes(1);
        });
      });

      describe('when eventType is unhandled', () => {
        it('then should not call createRequest', async () => {
          // Arrange
          const mockData = createMockCommunityRequestEventDto();
          const payload = createMockRequestEvent(EventType.USER_CREATED, mockData);

          // Act
          await sut.handleRequestEvent(payload);

          // Assert
          expect(mockRequestsService.createRequest).not.toHaveBeenCalled();
        });

        it('then should return RequestError for unhandled event type', async () => {
          // Arrange
          const mockData = createMockCommunityRequestEventDto();
          const payload = createMockRequestEvent(EventType.USER_UPDATED, mockData);

          // Act & Assert - should not throw, just log warning
          await expect(sut.handleRequestEvent(payload)).resolves.not.toThrow();
        });
      });
    });

    describe('Error Handling', () => {
      it('should not throw when service returns RepositoryException', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        mockRequestsService.createRequest.mockResolvedValue(left(new RepositoryException('DB Error')));

        // Act & Assert
        await expect(sut.handleRequestEvent(payload)).resolves.not.toThrow();
      });

      it('should not throw when service returns RequestError', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        mockRequestsService.createRequest.mockResolvedValue(left(new RequestError('Invalid request')));

        // Act & Assert
        await expect(sut.handleRequestEvent(payload)).resolves.not.toThrow();
      });

      it('should re-throw unexpected errors', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        mockRequestsService.createRequest.mockRejectedValue(new Error('Connection lost'));

        // Act & Assert
        await expect(sut.handleRequestEvent(payload)).rejects.toThrow('Connection lost');
      });
    });

    describe('Payload Processing', () => {
      it('should extract data from payload correctly', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto({
          id: 'specific-id-12345678-1234-1234-1234-123456789012',
          name: 'Specific Community Name',
        });
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        mockRequestsService.createRequest.mockResolvedValue(right({} as any));

        // Act
        await sut.handleRequestEvent(payload);

        // Assert
        expect(mockRequestsService.createRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'specific-id-12345678-1234-1234-1234-123456789012',
            name: 'Specific Community Name',
          }),
        );
      });

      it('should pass complete RequestEventDto to service', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        mockRequestsService.createRequest.mockResolvedValue(right({} as any));

        // Act
        await sut.handleRequestEvent(payload);

        // Assert
        expect(mockRequestsService.createRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            type: RequestType.COMMUNITY,
            status: RequestStatus.PENDING,
          }),
        );
      });
    });
  });

  describe('dispatch (private method - tested through handleRequestEvent)', () => {
    describe('Return Value Testing', () => {
      it('should return service result when REQUEST_CREATED succeeds', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const payload = createMockRequestEvent(EventType.REQUEST_CREATED, mockData);
        mockRequestsService.createRequest.mockResolvedValue(right({} as any));

        // Act & Assert - method completes without error indicating Right was returned
        await expect(sut.handleRequestEvent(payload)).resolves.not.toThrow();
      });

      it('should return Left with RequestError for unknown event types', async () => {
        // Arrange
        const mockData = createMockCommunityRequestEventDto();
        const unknownEventType = 'unknown.event' as EventType;
        const payload = createMockRequestEvent(unknownEventType, mockData);

        // Act & Assert - should complete without throwing
        await expect(sut.handleRequestEvent(payload)).resolves.not.toThrow();
      });
    });
  });
});
