import { User } from '@app/users/domain/model/user';
import { UserEventDto } from '../../../../../../libs/kafka/src/dtos/user.event.dto';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@solidarianid/kafka';

@Injectable()
export class UserEventMapper extends Mapper<User, UserEventDto> {
  toDto(user: User): UserEventDto {
    const dto = new UserEventDto();
    dto.id = user.id.value;
    dto.username = user.username;
    dto.mobilePhone = user.mobilePhone;
    dto.city = user.city;
    dto.countryCode = user.countryCode;
    return dto;
  }
}
