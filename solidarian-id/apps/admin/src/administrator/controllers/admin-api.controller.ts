import { Controller, Get, HttpCode, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { RequestsService } from '../model/domain/services/requests.service';
import { UsersService } from '../model/domain/services/users.service';
import { UserGroupByCountryResponseDto } from './dtos/user-group-by-country.response.dto';
import { AdminDtoMapper } from './mappers/admin.dto.mapper';
import { CauseGroupByOdsResponseDto } from './dtos/cause-group-by-ods.response.dto';
import { AuthGuard } from '@app/admin/auth/controllers/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/metrics')
export class MetricsApiController {
  constructor(
    private readonly userService: UsersService,
    private readonly requestService: RequestsService,
    private readonly adminMapper: AdminDtoMapper,
  ) {}

  @Get('users-by-country')
  @HttpCode(200)
  async getUsersByCountry(
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 6,
  ): Promise<UserGroupByCountryResponseDto[]> {
    const usersGroupedOrError = await this.userService.getUsersGroupByCountry(limit);

    if (usersGroupedOrError.isLeft()) {
      throw usersGroupedOrError.value;
    }
    return usersGroupedOrError.value.map(userGroupByCountryData =>
      this.adminMapper.toUserGroupByCountryResponseDto(userGroupByCountryData),
    );
  }

  @Get('causes-by-ods')
  @HttpCode(200)
  async getCausesByOds(): Promise<CauseGroupByOdsResponseDto[]> {
    const causesGroupedOrError = await this.requestService.getCausesGroupByOds();

    if (causesGroupedOrError.isLeft()) {
      throw causesGroupedOrError.value;
    }

    return causesGroupedOrError.value.map(causeGroupByOdsData =>
      this.adminMapper.toCauseGroupByOdsResponseDto(causeGroupByOdsData),
    );
  }
}
