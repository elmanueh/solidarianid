import { Either, left } from '@app/ddd/either';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { User } from '../../domain/models/user';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { UserQueryRepositoryPort } from '../../domain/ports/output/user-query.repository.port';
import { UserGroupByCountryData } from './data/user-group-by-country.data';
import { UserRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { PaginatedResult } from '@app/admin/administrator/model/domain/value-objects/paginated-result';
import { CommunityMembership, CreateCommunityMembershipProps } from '../../domain/value-objects/community-membership';
import { UserEventDto } from '@solidarianid/kafka';

/**
 * Implementación del servicio de usuarios
 * Orquesta las operaciones del repositorio y aplica lógica de negocio
 */
@Injectable()
export class UsersServiceImpl extends UsersService {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly userQueryRepository: UserQueryRepositoryPort,
  ) {
    super();
  }

  async getPaginatedUsers(page: number, limit: number): Promise<Either<RepositoryException, PaginatedResult<User>>> {
    return await this.userRepository.findPaginated(page, limit);
  }

  async getUserById(id: string): Promise<Either<RepositoryException, User>> {
    return await this.userRepository.findById(id);
  }

  async getTotalUsers(): Promise<Either<RepositoryException, number>> {
    return await this.userRepository.countAll();
  }

  async getUsersGroupByCountry(limit: number): Promise<Either<RepositoryException, UserGroupByCountryData[]>> {
    return await this.userQueryRepository.findUsersGroupByCountry(limit);
  }

  async createUser(userDto: UserEventDto): Promise<Either<RepositoryException, void>> {
    return await this.saveUser(userDto);
  }

  async updateUser(userDto: UserEventDto): Promise<Either<RepositoryException, void>> {
    const existingUserOrError = await this.userRepository.findById(userDto.id);
    if (existingUserOrError.isLeft()) {
      return left(existingUserOrError.value);
    }

    existingUserOrError.value.updateDetails({
      fullName: userDto.fullName,
      username: userDto.username,
      city: userDto.city,
      phone: userDto.mobilePhone,
      countryCode: userDto.countryCode,
    });

    return await this.userRepository.save(existingUserOrError.value);
  }

  async addMemberShip(
    userId: string,
    props: CreateCommunityMembershipProps,
  ): Promise<Either<RepositoryException, void>> {
    const existingUserOrError = await this.userRepository.findById(userId);
    if (existingUserOrError.isLeft()) {
      return left(existingUserOrError.value);
    }

    const communityMembership = CommunityMembership.create({
      communityId: props.communityId,
      communityName: props.communityName,
      role: props.role,
    });

    if (communityMembership.isLeft()) {
      return left(communityMembership.value);
    }

    existingUserOrError.value.addCommunityMembership(communityMembership.value);

    return await this.userRepository.save(existingUserOrError.value);
  }

  private async saveUser(userDto: UserEventDto): Promise<Either<RepositoryException, void>> {
    const user = User.create({
      id: userDto.id,
      fullName: userDto.fullName,
      username: userDto.username,
      city: userDto.city,
      phone: userDto.mobilePhone,
      countryCode: userDto.countryCode,
    });
    if (user.isLeft()) {
      return left(user.value);
    }
    return await this.userRepository.save(user.value);
  }
}
