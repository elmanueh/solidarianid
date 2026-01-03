import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { left, right } from '@app/ddd/either';
import { RequestsController } from '@app/admin/administrator/controllers/requests.controller';
import { Test, TestingModule } from '@nestjs/testing';

const createMockRequestsService = (): jest.Mocked<RequestsService> => ({
  createRequest: jest.fn(),
  updateStatus: jest.fn(),
  getCommunityRequestsPending: jest.fn(),
  getCauseRequestsPending: jest.fn(),
  getActionRequestsPending: jest.fn(),
});

const createMockUpdateStatusDto = (props: { status: RequestStatus; reason?: string }) => ({
  status: props.status,
  reason: props.reason,
});

const createMockValidationError = (message: string): ValidationError => {
  return new ValidationError(message);
};

describe('RequestsController', () => {
  let controller: RequestsController;
  let mockRequestsService: jest.Mocked<RequestsService>;
  const requestId = '2db201c8-5d35-462e-a1d1-985cb677725d';

  beforeEach(async () => {
    mockRequestsService = createMockRequestsService();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [
        {
          provide: RequestsService,
          useValue: mockRequestsService,
        },
      ],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('changeStatus', () => {
    describe('Basic Path Testing', () => {
      it('Path 1: should throw error when service returns Left (res.isLeft = true)', async () => {
        const validationError = new ValidationError('Invalid status');
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.APPROVED,
          reason: 'Approved successfully',
        });

        mockRequestsService.updateStatus.mockResolvedValue(left(new ValidationError('Invalid status')));

        await expect(controller.changeStatus(requestId, dto)).rejects.toThrow(validationError);
      });

      it('Path 2: should complete successfully when service returns Right (res.isLeft = false)', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.APPROVED,
          reason: 'Approved successfully',
        });
        mockRequestsService.updateStatus.mockResolvedValue(right(undefined));

        const result = await controller.changeStatus(requestId, dto);

        expect(result).toBeUndefined();
      });
    });

    describe('Condition Testing', () => {
      it('should handle res.isLeft() = true', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.REJECTED,
          reason: 'Rejected due to invalid data',
        });
        const error = createMockValidationError('Invalid request');
        mockRequestsService.updateStatus.mockResolvedValue(left(error));

        await expect(controller.changeStatus(requestId, dto)).rejects.toThrow(error);
      });

      it('should handle res.isLeft() = false', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.REJECTED,
          reason: 'Rejected due to invalid data',
        });
        mockRequestsService.updateStatus.mockResolvedValue(right(undefined));

        const result = await controller.changeStatus(requestId, dto);

        expect(result).toBeUndefined();
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty request ID', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.APPROVED,
          reason: 'Approved successfully',
        });
        const error = createMockValidationError('Invalid ID');
        mockRequestsService.updateStatus.mockResolvedValue(left(error));

        await expect(controller.changeStatus(requestId, dto)).rejects.toThrow(error);
      });

      it('should handle undefined reason in DTO', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.APPROVED,
          reason: undefined,
        });
        mockRequestsService.updateStatus.mockResolvedValue(right(undefined));

        const result = await controller.changeStatus(requestId, dto);

        expect(result).toBeUndefined();
      });

      it('should throw RequestAlreadyResolvedException when request is already resolved', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.APPROVED,
        });
        const exception = new RequestAlreadyResolvedError(requestId);
        mockRequestsService.updateStatus.mockResolvedValue(left(exception));

        await expect(controller.changeStatus(requestId, dto)).rejects.toThrow(exception);
      });

      it('should handle APPROVED status', async () => {
        const requestId = 'pending-request';
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.APPROVED,
          reason: 'Meets all criteria',
        });
        mockRequestsService.updateStatus.mockResolvedValue(right(undefined));

        const result = await controller.changeStatus(requestId, dto);

        expect(result).toBeUndefined();
      });

      it('should handle REJECTED status', async () => {
        const requestId = 'pending-request';
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.REJECTED,
          reason: 'Missing documentation',
        });
        mockRequestsService.updateStatus.mockResolvedValue(right(undefined));

        const result = await controller.changeStatus(requestId, dto);

        expect(result).toBeUndefined();
      });

      it('should handle special characters in reason', async () => {
        const requestId = 'pending-request';
        const specialReason = 'Reason with <special> & "characters" \n\t';
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.REJECTED,
          reason: specialReason,
        });
        mockRequestsService.updateStatus.mockResolvedValue(right(undefined));

        const result = await controller.changeStatus(requestId, dto);

        expect(result).toBeUndefined();
      });

      it('should handle very long reasons', async () => {
        const longReason = 'This is a very long reason. '.repeat(100);
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.REJECTED,
          reason: longReason,
        });
        mockRequestsService.updateStatus.mockResolvedValue(right(undefined));

        const result = await controller.changeStatus(requestId, dto);

        expect(result).toBeUndefined();
      });
    });

    describe('Exception Handling', () => {
      it('should throw ValidationError when service returns Left with ValidationError', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.APPROVED,
          reason: 'Valid reason',
        });
        const validationError = createMockValidationError('Request not found');
        mockRequestsService.updateStatus.mockResolvedValue(left(validationError));

        await expect(controller.changeStatus(requestId, dto)).rejects.toThrow(ValidationError);
      });

      it('should throw RequestAlreadyResolvedException when appropriate', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.REJECTED,
          reason: 'Already resolved',
        });
        const exception = new RequestAlreadyResolvedError(requestId);
        mockRequestsService.updateStatus.mockResolvedValue(left(exception));

        await expect(controller.changeStatus(requestId, dto)).rejects.toThrow(RequestAlreadyResolvedError);
      });

      it('should throw the exact error object returned by service', async () => {
        const dto = createMockUpdateStatusDto({
          status: RequestStatus.APPROVED,
          reason: 'Some reason',
        });
        const specificError = createMockValidationError('Specific error message');
        mockRequestsService.updateStatus.mockResolvedValue(left(specificError));

        await expect(controller.changeStatus(requestId, dto)).rejects.toBe(specificError);
      });
    });
  });
});
