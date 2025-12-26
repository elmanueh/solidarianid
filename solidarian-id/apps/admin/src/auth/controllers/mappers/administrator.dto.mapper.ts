import { Administrator } from 'apps/admin/src/administrator/model/domain/model/administrator';
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
