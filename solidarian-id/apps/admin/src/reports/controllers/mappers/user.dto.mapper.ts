import { User } from '@app/admin/administrator/model/domain/model/user';
import { UserListResponseDto } from '../dto/output/user-list-response.dto';
import {
  UserDetailResponseDto,
  CommunityDto,
} from '../dto/output/user-detail-response.dto';

/**
 * Mapper para convertir entidades User del dominio a DTOs de respuesta
 */
export class UserDtoMapper {
  /**
   * Convierte User a DTO para lista (información mínima)
   */
  static toListDto(user: User): UserListResponseDto {
    return new UserListResponseDto(
      user.id.value,
      user.username,
      user.city,
      user.countryCode,
      user.communityMemberships.length,
    );
  }

  /**
   * Convierte User a DTO para detalle (información completa)
   */
  static toDetailDto(user: User): UserDetailResponseDto {
    const communities = user.communityMemberships.map(
      (membership) =>
        new CommunityDto(
          membership.communityId,
          membership.communityName,
          membership.isAdmin,
        ),
    );

    return new UserDetailResponseDto(
      user.id.value,
      user.username,
      user.phone,
      user.city,
      user.countryCode,
      communities,
    );
  }
}
