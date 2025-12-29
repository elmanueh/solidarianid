/**
 * DTO de respuesta para lista de usuarios
 * Contiene información mínima para mostrar en la lista paginada
 */
export class UserListResponseDto {
  id: string;
  username: string;
  city: string;
  countryCode: string;
  communitiesCount: number;

  constructor(
    id: string,
    username: string,
    city: string,
    countryCode: string,
    communitiesCount: number,
  ) {
    this.id = id;
    this.username = username;
    this.city = city;
    this.countryCode = countryCode;
    this.communitiesCount = communitiesCount;
  }
}
