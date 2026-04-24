import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

type HealthResponse = {
  status: 'ok';
};

@ApiTags('Health')
@Controller('health')
// istanbul ignore next
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiOkResponse({ description: 'Service is healthy', schema: { example: { status: 'ok' } } })
  getHealth(): HealthResponse {
    return { status: 'ok' };
  }
}
