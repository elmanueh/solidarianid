/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
import { ReportsApiController } from '@app/admin/administrator/controllers/reports-api.controller';
import { UsersService } from '@app/admin/administrator/model/domain/services/users.service';
import { UserPdfGeneratorPort } from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import { User } from '@app/admin/administrator/model/domain/models/user';
import { left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { UserNotFoundError } from '@app/admin/administrator/model/domain/errors/user-not-found.error';
import { Test, TestingModule } from '@nestjs/testing';
import type { Response } from 'express';
import { Readable } from 'node:stream';

const createMockUsersService = (): jest.Mocked<UsersService> => ({
  getPaginatedUsers: jest.fn(),
  getUserById: jest.fn(),
  getTotalUsers: jest.fn(),
});

const createMockPdfGenerator = (): jest.Mocked<UserPdfGeneratorPort> => ({
  generate: jest.fn(),
});

const createMockResponse = (): jest.Mocked<Response> => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
    pipe: jest.fn().mockReturnThis(),
  } as any;
  return res;
};

const createMockUser = (id: string, username: string): User => {
  const userResult = User.create(id, 'Test User', username, '+34612345678', 'Madrid', 'ES', [
    {
      communityId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      communityName: 'Test Community',
      isAdmin: false,
    },
  ]);

  if (userResult.isLeft()) {
    throw new Error(`Failed to create mock user: ${userResult.value.message}`);
  }

  return userResult.value;
};

const createMockPdfStream = (): Readable => {
  const stream = new Readable();
  stream.push('%PDF-1.4');
  stream.push(null);
  stream.pipe = jest.fn().mockReturnThis();
  return stream;
};

describe('ReportsApiController', () => {
  let controller: ReportsApiController;
  let mockUsersService: jest.Mocked<UsersService>;
  let mockPdfGenerator: jest.Mocked<UserPdfGeneratorPort>;
  const userId = '550e8400-e29b-41d4-a716-446655440000';
  const nonExistentUserId = '550e8400-e29b-41d4-a716-446655440099';

  beforeEach(async () => {
    mockUsersService = createMockUsersService();
    mockPdfGenerator = createMockPdfGenerator();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsApiController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: UserPdfGeneratorPort,
          useValue: mockPdfGenerator,
        },
      ],
    }).compile();

    controller = module.get<ReportsApiController>(ReportsApiController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserDetail', () => {
    describe('Basic Path Testing', () => {
      it('Path 1: should return 404 when service returns Left', async () => {
        const mockResponse = createMockResponse();
        const error = new EntityNotFoundException('User', userId);
        mockUsersService.getUserById.mockResolvedValue(left(error));

        await controller.getUserDetail(userId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            statusCode: 404,
            message: error.message,
          }),
        );
      });

      it('Path 2: should return 200 with user detail when service succeeds', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'detailed_user');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));

        await controller.getUserDetail(userId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            id: userId,
            username: 'detailed_user',
          }),
        );
      });
    });

    describe('Condition Testing', () => {
      it('should handle result.isLeft() = true', async () => {
        const mockResponse = createMockResponse();
        mockUsersService.getUserById.mockResolvedValue(left(new UserNotFoundError(userId)));

        await controller.getUserDetail(userId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('should handle result.isLeft() = false', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'test_user');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));

        await controller.getUserDetail(userId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe('Exception Handling', () => {
      it('should return error response with timestamp', async () => {
        const mockResponse = createMockResponse();
        const error = new EntityNotFoundException('User', userId);
        mockUsersService.getUserById.mockResolvedValue(left(error));

        await controller.getUserDetail(userId, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            timestamp: expect.any(String),
          }),
        );
      });
    });
  });

  describe('downloadUserPdf', () => {
    describe('Basic Path Testing', () => {
      it('Path 1: should return 404 when user is not found', async () => {
        const mockResponse = createMockResponse();
        const error = new UserNotFoundError(nonExistentUserId);
        mockUsersService.getUserById.mockResolvedValue(left(error));

        await controller.downloadUserPdf(nonExistentUserId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            statusCode: 404,
            message: error.message,
          }),
        );
      });

      it('Path 2: should return 500 when PDF generation fails', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'pdf_user');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockRejectedValue(new Error('PDF generation error'));

        await controller.downloadUserPdf(userId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            statusCode: 500,
            message: 'Error generating PDF report',
          }),
        );
      });

      it('Path 3: should generate and stream PDF when everything succeeds', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'pdf_user');
        const mockStream = createMockPdfStream();
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockResolvedValue(mockStream);

        await controller.downloadUserPdf(userId, mockResponse);

        expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
        expect(mockResponse.setHeader).toHaveBeenCalledWith(
          'Content-Disposition',
          expect.stringContaining('attachment'),
        );
        expect(mockStream.pipe).toHaveBeenCalledWith(mockResponse);
      });
    });

    describe('Condition Testing', () => {
      it('should handle result.isLeft() = true (user not found)', async () => {
        const mockResponse = createMockResponse();
        mockUsersService.getUserById.mockResolvedValue(left(new UserNotFoundError(userId)));

        await controller.downloadUserPdf(userId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('should handle result.isLeft() = false (user found)', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'pdf_user');
        const mockStream = createMockPdfStream();
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockResolvedValue(mockStream);

        await controller.downloadUserPdf(userId, mockResponse);

        expect(mockResponse.status).not.toHaveBeenCalledWith(404);
        expect(mockResponse.setHeader).toHaveBeenCalled();
      });
    });

    describe('Exception Handling', () => {
      it('should catch PDF generation errors', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'error_user');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockRejectedValue(new Error('Unexpected PDF error'));

        await controller.downloadUserPdf(userId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            message: 'Error generating PDF report',
          }),
        );
      });

      it('should return error response with timestamp on PDF failure', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'error_user');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockRejectedValue(new Error('PDF error'));

        await controller.downloadUserPdf(userId, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            timestamp: expect.any(String),
          }),
        );
      });
    });
  });
});
