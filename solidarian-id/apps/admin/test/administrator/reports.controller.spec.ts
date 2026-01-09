/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ReportsApiController } from '@app/admin/administrator/controllers/reports-api.controller';
import { User } from '@app/admin/administrator/model/domain/models/user';
import { UserPdfGeneratorPort } from '@app/admin/administrator/model/domain/ports/output/user-pdf-generator.port';
import { UsersService } from '@app/admin/administrator/model/domain/services/users.service';
import { left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { PdfGenerationException } from '@app/admin/administrator/model/domain/errors/pdf-generation.exception';
import { Test, TestingModule } from '@nestjs/testing';
import type { Response } from 'express';
import { Readable } from 'node:stream';

const createMockUsersService = (): jest.Mocked<UsersService> => ({
  getPaginatedUsers: jest.fn(),
  getUserById: jest.fn(),
  getTotalUsers: jest.fn(),
  getUsersGroupByCountry: jest.fn(),
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
  const userResult = User.reconstitute({
    id: id,
    fullName: 'Test User',
    username: username,
    phone: '+34612345678',
    city: 'Madrid',
    countryCode: 'ES',
    communityMemberships: [
      {
        communityId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        communityName: 'Test Community',
        isAdmin: false,
      },
    ],
  });

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
      it('Path 1: should throw EntityNotFoundException when service returns Left', async () => {
        const error = new EntityNotFoundException('User', userId);
        mockUsersService.getUserById.mockResolvedValue(left(error));

        await expect(controller.getUserDetail(userId)).rejects.toThrow(EntityNotFoundException);
        await expect(controller.getUserDetail(userId)).rejects.toThrow(/was not found/);
      });

      it('Path 2: should return user detail DTO when service succeeds', async () => {
        const mockUser = createMockUser(userId, 'detailed_user');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));

        const result = await controller.getUserDetail(userId);

        expect(result).toEqual(
          expect.objectContaining({
            id: userId,
            username: 'detailed_user',
          }),
        );
      });
    });

    describe('Condition Testing', () => {
      it('should handle result.isLeft() = true', async () => {
        mockUsersService.getUserById.mockResolvedValue(left(new EntityNotFoundException('User', userId)));

        await expect(controller.getUserDetail(userId)).rejects.toThrow(EntityNotFoundException);
      });

      it('should handle result.isLeft() = false', async () => {
        const mockUser = createMockUser(userId, 'test_user');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));

        const result = await controller.getUserDetail(userId);

        expect(result).toBeDefined();
        expect(result.id).toBe(userId);
      });
    });
    describe('Exception Handling', () => {
      it('should throw EntityNotFoundException with correct message', async () => {
        const error = new EntityNotFoundException('User', userId);
        mockUsersService.getUserById.mockResolvedValue(left(error));

        await expect(controller.getUserDetail(userId)).rejects.toThrow(error.message);
      });
    });
  });

  describe('downloadUserPdf', () => {
    describe('Basic Path Testing', () => {
      it('Path 1: should return 404 when user is not found', async () => {
        const mockResponse = createMockResponse();
        const error = new EntityNotFoundException('User', nonExistentUserId);
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

      it('Path 2: should throw PdfGenerationException when PDF generation fails', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'pdf_user');
        const pdfError = new PdfGenerationException('Failed to generate PDF report: PDF generation error');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockReturnValue(left(pdfError));

        await expect(controller.downloadUserPdf(userId, mockResponse)).rejects.toThrow(PdfGenerationException);
        await expect(controller.downloadUserPdf(userId, mockResponse)).rejects.toThrow(/Failed to generate PDF/);
      });

      it('Path 3: should generate and stream PDF when everything succeeds', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'pdf_user');
        const mockStream = createMockPdfStream();
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockReturnValue(right(mockStream));

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
        mockUsersService.getUserById.mockResolvedValue(left(new EntityNotFoundException('User', userId)));

        await controller.downloadUserPdf(userId, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('should handle result.isLeft() = false (user found)', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'pdf_user');
        const mockStream = createMockPdfStream();
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockReturnValue(right(mockStream));

        await controller.downloadUserPdf(userId, mockResponse);

        expect(mockResponse.status).not.toHaveBeenCalledWith(404);
        expect(mockResponse.setHeader).toHaveBeenCalled();
      });
    });

    describe('Exception Handling', () => {
      it('should throw PdfGenerationException on PDF generation errors', async () => {
        const mockResponse = createMockResponse();
        const mockUser = createMockUser(userId, 'error_user');
        const pdfError = new PdfGenerationException('Failed to generate PDF report: Unexpected PDF error');
        mockUsersService.getUserById.mockResolvedValue(right(mockUser));
        mockPdfGenerator.generate.mockReturnValue(left(pdfError));

        await expect(controller.downloadUserPdf(userId, mockResponse)).rejects.toThrow(PdfGenerationException);
        await expect(controller.downloadUserPdf(userId, mockResponse)).rejects.toThrow(/Unexpected PDF error/);
      });
    });
  });
});
