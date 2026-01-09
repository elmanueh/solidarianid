import { UpdateStatusRequestDto } from '@app/admin/administrator/controllers/dtos/update-status.request.dto';
import { RequestsService } from '@app/admin/administrator/model/domain/services/requests.service';
import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';

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
