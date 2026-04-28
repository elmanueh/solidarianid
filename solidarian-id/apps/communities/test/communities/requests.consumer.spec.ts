import { RequestStatus } from '@app/communities/shared/domain/model/enums/request-status';
import { RequestType } from '@app/communities/shared/domain/model/enums/request-type';
import { RequestsService } from '@app/communities/shared/domain/services/request.service';
import { RequestsConsumerAdapter } from '@app/communities/shared/infrastructure/messaging/consumers/requests.consumer';
import { left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityRequestEventDto, EventType, RequestEvent } from '@solidarianid/kafka';

describe('RequestsConsumerAdapter', () => {
  let adapter: RequestsConsumerAdapter;
  let mockRequestService: {
    acceptRequest: jest.Mock;
    rejectRequest: jest.Mock;
  };

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'debug').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    mockRequestService = {
      acceptRequest: jest.fn(),
      rejectRequest: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsConsumerAdapter],
      providers: [{ provide: RequestsService, useValue: mockRequestService }],
    }).compile();

    adapter = module.get<RequestsConsumerAdapter>(RequestsConsumerAdapter);
  });

  describe('handleRequestEvent', () => {
    const validPayload: CommunityRequestEventDto = {
      id: 'req-123',
      name: 'New Community Request',
      description: 'Request to create a new community',
      status: RequestStatus.PENDING,
      userId: 'user-456',
      type: RequestType.COMMUNITY,
      causeRequests: [
        {
          name: 'Cause 1',
          description: 'First cause',
          status: RequestStatus.PENDING,
          ods: [1, 2],
          initialDate: new Date(),
          durationDays: 30,
        },
      ],
    };

    const createRequestEvent = (eventType: EventType): RequestEvent => new RequestEvent(eventType, validPayload);

    it('should handle REQUEST_ACCEPTED successfully', async () => {
      mockRequestService.acceptRequest.mockResolvedValueOnce(right(undefined));

      await expect(adapter.handleRequestEvent(createRequestEvent(EventType.REQUEST_ACCEPTED))).resolves.not.toThrow();

      expect(mockRequestService.acceptRequest).toHaveBeenCalledWith(validPayload);
    });

    it('should handle REQUEST_DECLINED successfully', async () => {
      mockRequestService.rejectRequest.mockResolvedValueOnce(right(undefined));

      await expect(adapter.handleRequestEvent(createRequestEvent(EventType.REQUEST_DECLINED))).resolves.not.toThrow();

      expect(mockRequestService.rejectRequest).toHaveBeenCalledWith(validPayload);
    });

    it('should handle error when acceptRequest returns left', async () => {
      const error = new ValidationError('Invalid request');
      mockRequestService.acceptRequest.mockResolvedValueOnce(left(error));

      await expect(adapter.handleRequestEvent(createRequestEvent(EventType.REQUEST_ACCEPTED))).resolves.not.toThrow();

      expect(mockRequestService.acceptRequest).toHaveBeenCalledWith(validPayload);
    });

    it('should handle error when rejectRequest returns left', async () => {
      const error = new RepositoryException('Repository error');
      mockRequestService.rejectRequest.mockResolvedValueOnce(left(error));

      await expect(adapter.handleRequestEvent(createRequestEvent(EventType.REQUEST_DECLINED))).resolves.not.toThrow();

      expect(mockRequestService.rejectRequest).toHaveBeenCalledWith(validPayload);
    });

    it('should handle unhandled event type', async () => {
      await expect(adapter.handleRequestEvent(createRequestEvent('UNKNOWN_EVENT' as EventType))).resolves.not.toThrow();
    });

    it('should catch and throw unexpected errors', async () => {
      mockRequestService.acceptRequest.mockRejectedValueOnce(new Error('Unexpected error'));

      await expect(adapter.handleRequestEvent(createRequestEvent(EventType.REQUEST_ACCEPTED))).rejects.toThrow(
        'Unexpected error',
      );
    });
  });
});
