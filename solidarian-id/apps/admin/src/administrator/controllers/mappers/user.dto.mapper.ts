import {
  CommunityDto,
  UserDetailResponseDto,
} from '@app/admin/administrator/controllers/dtos/user-detail.response.dto';
import { User } from '@app/admin/administrator/model/domain/models/user';
import type { CommunityMembership } from '@app/admin/administrator/model/domain/value-objects/community-membership';

/**
 * Mapper para convertir entidades User del dominio a DTOs de respuesta
 */
export class UserDtoMapper {
  /**
   * Convierte User a DTO para detalle (información completa)
   */
  static toDetailDto(user: User): UserDetailResponseDto {
    const communities = user.communityMemberships.map(
      (membership: CommunityMembership) =>
        new CommunityDto(membership.communityId, membership.communityName, membership.role),
    );

    return new UserDetailResponseDto(
      user.id.value,
      user.fullName,
      user.username,
      user.phone,
      user.city,
      user.countryCode,
      communities,
    );
  }
}
