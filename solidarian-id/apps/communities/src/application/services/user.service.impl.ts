import { User } from '@app/communities/domain/model/entities/user';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { UserService } from '@app/communities/domain/services/user.service';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Inject, Injectable } from '@nestjs/common';
import { UserEventDto } from '@solidarianid/kafka';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(UsersRepositoryPort)
    private readonly userRepository: UsersRepositoryPort,
  ) {}

  async createUser(user: UserEventDto): Promise<Either<ValidationError | RepositoryException, User>> {
    const idOrError = UniqueEntityID.create(user.id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const existingUserOrError = await this.userRepository.findById(idOrError.value.value);

    if (existingUserOrError.isRight()) {
      return right(existingUserOrError.value);
    }

    const newUserOrError = User.create(
      {
        fullName: user.fullName,
        mobilePhone: user.mobilePhone,
      },
      user.id,
    );

    if (newUserOrError.isLeft()) {
      return left(newUserOrError.value);
    }

    const savedUser = await this.userRepository.save(newUserOrError.value);

    if (savedUser.isLeft()) {
      return left(savedUser.value);
    }

    return right(newUserOrError.value);
  }

  async updateUser(user: UserEventDto): Promise<Either<ValidationError | RepositoryException, User>> {
    const userOrError = await this.userRepository.findById(user.id);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const updatedUserOrError = User.create(
      {
        fullName: user.fullName,
        mobilePhone: user.mobilePhone,
      },
      userOrError.value.id.value,
    );

    if (updatedUserOrError.isLeft()) {
      return left(updatedUserOrError.value);
    }

    const savedUser = await this.userRepository.save(updatedUserOrError.value);

    if (savedUser.isLeft()) {
      return left(savedUser.value);
    }

    return right(updatedUserOrError.value);
  }
}
