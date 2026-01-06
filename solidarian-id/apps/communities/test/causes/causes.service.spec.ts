import { Test, TestingModule } from '@nestjs/testing';
import { right, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CausesServiceImpl } from '@app/communities/application/services/causes.service.impl';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { CauseRequestEventDto } from '@solidarianid/kafka';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

describe('CausesServiceImpl', () => {
  let service: CausesServiceImpl;
  let mockCauseRepository: {
    findAll: jest.Mock;
    findById: jest.Mock;
    save: jest.Mock;
  };

  const validCommunityId = 'b1b2c3d4-e5f6-4890-abcd-ef1234567002';
  const validCauseId = 'c1b2c3d4-e5f6-4890-abcd-ef1234567003';
  const validUserId = 'a1b2c3d4-e5f6-4890-abcd-ef1234567001';

  const createValidCauseDto = (): CauseRequestEventDto => ({
    id: validCauseId,
    name: 'Test Cause',
    description: 'A valid test cause description with more than 20 characters',
    status: RequestStatus.APPROVED,
    userId: validUserId,
    username: 'testuser',
    communityId: validCommunityId,
    ods: [SustainableDevelopmentGoal.NoPoverty],
    initialDate: new Date('2026-01-01'),
    durationDays: 90,
    type: RequestType.CAUSE,
  });

  const createMockCause = (): Cause => {
    const causeOrError = Cause.create(
      {
        name: 'Test Cause',
        description: 'A valid test cause description with more than 20 characters',
        ods: [SustainableDevelopmentGoal.NoPoverty],
        initialDate: new Date('2026-01-01'),
        durationDays: 90,
        communityId: validCommunityId,
      },
      validCauseId,
    );
    if (causeOrError.isLeft()) throw new Error('Failed to create mock cause');
    return causeOrError.value;
  };

  beforeEach(async () => {
    mockCauseRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CausesServiceImpl, { provide: CausesRepositoryPort, useValue: mockCauseRepository }],
    }).compile();

    service = module.get<CausesServiceImpl>(CausesServiceImpl);
  });

  describe('create', () => {
    it('should create a cause successfully', async () => {
      const dto = createValidCauseDto();
      mockCauseRepository.save.mockResolvedValueOnce(right(undefined));

      const result = await service.create(dto);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(Cause);
        expect(result.value.name).toBe(dto.name);
        expect(result.value.description).toBe(dto.description);
        expect(result.value.durationDays).toBe(dto.durationDays);
        expect(result.value.ods).toEqual(dto.ods);
        expect(result.value.communityId).toBe(dto.communityId);
      }
      expect(mockCauseRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return ValidationError when name is invalid', async () => {
      const dto = createValidCauseDto();
      dto.name = 'ab'; // Too short

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when description is invalid', async () => {
      const dto = createValidCauseDto();
      dto.description = 'short'; // Too short

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });

    it('should return ValidationError when durationDays is invalid', async () => {
      const dto = createValidCauseDto();
      dto.durationDays = -1; // Negative duration

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(mockCauseRepository.save).not.toHaveBeenCalled();
    });

    it('should return RepositoryException when save fails', async () => {
      const dto = createValidCauseDto();
      const repoError = new RepositoryException('Database error');
      mockCauseRepository.save.mockResolvedValueOnce(left(repoError));

      const result = await service.create(dto);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(RepositoryException);
    });
  });

  describe('getCauses', () => {
    it('should return empty array when repository returns []', async () => {
      mockCauseRepository.findAll.mockResolvedValueOnce(right([]));

      const result = await service.getCauses();

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual([]);
      }
      expect(mockCauseRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return causes when repository returns data', async () => {
      const mockCauses = [createMockCause()];
      mockCauseRepository.findAll.mockResolvedValueOnce(right(mockCauses));

      const result = await service.getCauses();

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0]).toBeInstanceOf(Cause);
      }
      expect(mockCauseRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should propagate ValidationError from repository', async () => {
      const err = new ValidationError('Invalid repository data');
      mockCauseRepository.findAll.mockResolvedValueOnce(left(err));

      const result = await service.getCauses();

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(err);
      expect(mockCauseRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCauseById', () => {
    it('should return cause when repository returns data', async () => {
      const mockCause = createMockCause();
      mockCauseRepository.findById.mockResolvedValueOnce(right(mockCause));

      const result = await service.getCauseById(validCauseId);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(Cause);
        expect(result.value.id.value).toBe(validCauseId);
      }
      expect(mockCauseRepository.findById).toHaveBeenCalledWith(validCauseId, ['actions']);
    });

    it('should propagate ValidationError from repository', async () => {
      const err = new ValidationError('Cause not found');
      mockCauseRepository.findById.mockResolvedValueOnce(left(err));

      const result = await service.getCauseById(validCauseId);

      expect(result.isLeft()).toBe(true);
      expect(result.value).toBe(err);
      expect(mockCauseRepository.findById).toHaveBeenCalledWith(validCauseId, ['actions']);
    });

    it('should request actions relation when fetching by id', async () => {
      const mockCause = createMockCause();
      mockCauseRepository.findById.mockResolvedValueOnce(right(mockCause));

      await service.getCauseById(validCauseId);

      expect(mockCauseRepository.findById).toHaveBeenCalledWith(validCauseId, ['actions']);
    });
  });
});
