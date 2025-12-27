import { Administrator } from '@app/admin/administrator/model/domain/models/administrator';
import { AdministratorResponseDto } from '../dto/output/administrator-response.dto';

export class AdministratorDtoMapper {
  public static toDto(administrator: Administrator): AdministratorResponseDto {
    return new AdministratorResponseDto(
      administrator.fullname,
      administrator.email,
      administrator.phone,
    );
  }
}
