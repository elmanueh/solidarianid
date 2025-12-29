import { User } from '@app/admin/administrator/model/domain/models/user';
import { UserListResponseDto } from '../../model/application/dtos/output/user-list-response.dto';
import {
  UserDetailResponseDto,
  CommunityDto,
} from '../../model/application/dtos/output/user-detail-response.dto';
import type { CommunityMembership } from '@app/admin/administrator/model/domain/value-objects/community-membership';

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
      (membership: CommunityMembership) =>
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
