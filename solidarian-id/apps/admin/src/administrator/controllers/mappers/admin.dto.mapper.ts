import { Injectable } from '@nestjs/common';
import { UserGroupByCountryData } from '../../model/application/services/data/user-group-by-country.data';
import { CauseGroupByOdsResponseDto } from '../dtos/cause-group-by-ods.response.dto';
import { UserGroupByCountryResponseDto } from '../dtos/user-group-by-country.response.dto';
import { CauseGroupByOdsData } from '../../model/application/services/data/cause-group-by-ods.data';

@Injectable()
export class AdminDtoMapper {
  toUserGroupByCountryResponseDto(data: UserGroupByCountryData): UserGroupByCountryResponseDto {
    const dto = new UserGroupByCountryResponseDto();
    dto.country = data.country;
    dto.userCount = data.userCount;
    return dto;
  }

  toCauseGroupByOdsResponseDto(data: CauseGroupByOdsData): CauseGroupByOdsResponseDto {
    const dto = new CauseGroupByOdsResponseDto();
    dto.ods = data.ods;
    dto.causeCount = data.causeCount;
    return dto;
  }
}
