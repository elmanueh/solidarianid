import { Injectable } from '@nestjs/common';
import { UserGroupByCountryData } from '@app/admin/administrator/model/application/services/data/user-group-by-country.data';
import { CauseGroupByOdsResponseDto } from '@app/admin/administrator/controllers/dtos/cause-group-by-ods.response.dto';
import { UserGroupByCountryResponseDto } from '@app/admin/administrator/controllers/dtos/user-group-by-country.response.dto';
import { CauseGroupByOdsData } from '@app/admin/administrator/model/application/services/data/cause-group-by-ods.data';

@Injectable()
export class AdminDtoMapper {
  toUserGroupByCountryResponseDto(data: UserGroupByCountryData): UserGroupByCountryResponseDto {
    return {
      country: data.country,
      userCount: data.userCount,
    };
  }

  toCauseGroupByOdsResponseDto(data: CauseGroupByOdsData): CauseGroupByOdsResponseDto {
    return {
      ods: data.ods,
      causeCount: data.causeCount,
    };
  }
}
