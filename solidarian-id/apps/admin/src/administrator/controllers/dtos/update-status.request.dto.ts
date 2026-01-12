import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateStatusRequestDto {
  @IsIn([RequestStatus.APPROVED, RequestStatus.REJECTED])
  status: RequestStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}
