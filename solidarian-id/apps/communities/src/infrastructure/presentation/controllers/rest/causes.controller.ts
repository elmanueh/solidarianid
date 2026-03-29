import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CauseDomainMapper } from '../../mappers/cause.mapper';
import { CausesService } from '@app/communities/domain/services/causes.service';
import { CauseSummaryResponseDto } from '../../dtos/output/cause-summary.response.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { CauseDetailResponseDto } from '../../dtos/output/cause-detail.response.dto';
import { FollowerJoinCauseRequestDto } from '../../dtos/input/follower-join-cause.request.dto';

@Controller()
export class CausesController {
  constructor(private readonly causesService: CausesService) {}

  @Get('causes')
  @ApiOperation({ summary: 'Retrieve all charitable causes' })
  @ApiOkResponse({
    description: 'List of causes',
    type: [CauseSummaryResponseDto],
    isArray: true,
  })
  async getCauses(): Promise<CauseSummaryResponseDto[]> {
    const causes = await this.causesService.getAll();

    if (causes.isLeft()) {
      throw causes.value;
    }

    return causes.value.map((cause: Cause) => CauseDomainMapper.toCauseSummaryDto(cause));
  }

  @Get('causes/:id')
  @ApiOperation({ summary: 'Retrieve a charitable cause by ID' })
  @ApiOkResponse({
    description: 'Cause details',
    type: CauseDetailResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Cause not found' })
  async getCauseById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CauseDetailResponseDto> {
    const cause = await this.causesService.getById(id, ['users', 'actions']);

    if (cause.isLeft()) {
      throw cause.value;
    }

    return CauseDomainMapper.toCauseDetailDto(cause.value);
  }

  @Get('communities/:communityId/causes')
  @ApiOperation({ summary: 'Retrieve all causes for a specific community' })
  @ApiOkResponse({
    description: 'List of causes for the specified community',
    type: [CauseSummaryResponseDto],
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Community not found' })
  async getCausesByCommunityId(
    @Param('communityId', new ParseUUIDPipe()) communityId: string,
  ): Promise<CauseSummaryResponseDto[]> {
    const causes = await this.causesService.getAllByCommunityId(communityId);

    if (causes.isLeft()) {
      throw causes.value;
    }

    return causes.value.map((cause: Cause) => CauseDomainMapper.toCauseSummaryDto(cause));
  }

  @Get('communities/:communityId/causes/:causeId')
  @ApiOperation({ summary: 'Retrieve a specific cause for a specific community' })
  @ApiOkResponse({
    description: 'Details of the specified cause for the specified community',
    type: CauseDetailResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Community or Cause not found' })
  async getCauseByCommunityIdAndCauseId(
    @Param('communityId', new ParseUUIDPipe()) communityId: string,
    @Param('causeId', new ParseUUIDPipe()) causeId: string,
  ): Promise<CauseDetailResponseDto> {
    const cause = await this.causesService.getByCommunityIdAndCauseId(communityId, causeId, ['users', 'actions']);
    if (cause.isLeft()) {
      throw cause.value;
    }

    return CauseDomainMapper.toCauseDetailDto(cause.value);
  }

  @Post('causes/:id/followers')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Join a user as a supporter of a cause' })
  @ApiCreatedResponse({
    description: 'User successfully joined the cause',
  })
  @ApiBadRequestResponse({ description: 'The request parameters are invalid' })
  @ApiNotFoundResponse({ description: 'Cause or user not found' })
  @ApiConflictResponse({ description: 'User is already following the cause' })
  @ApiUnauthorizedResponse({ description: 'User is not a member of the community linked to the cause' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async joinCause(
    @Param('id', new ParseUUIDPipe()) causeId: string,
    @Body() dto: FollowerJoinCauseRequestDto,
  ): Promise<void> {
    const result = await this.causesService.joinCause(causeId, dto.userId);

    if (result.isLeft()) {
      throw result.value;
    }

    return undefined;
  }
}
