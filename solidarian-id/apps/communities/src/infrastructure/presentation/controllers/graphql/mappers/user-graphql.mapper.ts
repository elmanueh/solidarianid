import { Injectable } from '@nestjs/common';
import { User as UserGraphql } from '../entities/user';
import { User } from '@app/communities/domain/model/entities/user';

@Injectable()
export class UserGraphqlMapper {
  toUser(user: User): UserGraphql {
    return {
      id: user.id.value,
      fullName: user.fullName,
      email: user.email,
      mobilePhone: user.mobilePhone,
    };
  }
}
