import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';

export class CauseRequestResponseDto {
  static toDto(cause: CauseRequest): CauseRequestResponseDto {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      date: cause.createdAt,
      startDate: cause.startDate,
      duration: cause.duration,
      ods: [...cause.ods],
    };
  }
}
