import { User } from '@app/admin/administrator/model/domain/models/user';
import { UserRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { UsersConsumerService } from '@app/admin/administrator/model/domain/services/users-consumer.service';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { UserEventDto } from '@solidarianid/kafka';

@Injectable()
export class UsersConsumerServiceImpl extends UsersConsumerService {
  constructor(private readonly userRepository: UserRepositoryPort) {
    super();
  }

  async saveNewUser(userEventDto: UserEventDto): Promise<Either<ValidationError, void>> {
    const userOrError = User.create({
      id: userEventDto.id,
      fullName: userEventDto.fullName,
      username: userEventDto.username,
      phone: userEventDto.mobilePhone,
      city: userEventDto.city,
      countryCode: userEventDto.countryCode,
    });

    if (userOrError.isLeft()) {
      return left(new ValidationError(`Validation error creating user model: ${userOrError.value.message}`));
    }

    const user = userOrError.value;
    const saveResult = await this.userRepository.save(user);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    return right(undefined);
  }
}
