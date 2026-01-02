import { UpdateStatusRequestDto } from '@app/admin/administrator/model/application/dtos/update-status.request.dto';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { Controller, Patch, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changeStatus(@Param('id') id: string, @Body() body: UpdateStatusRequestDto) {
    const { status, reason } = body;
    const res = await this.requestsService.updateStatus(id, status, reason);
    if (res.isLeft()) throw res.value;
  }
}
