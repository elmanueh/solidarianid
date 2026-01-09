/**
 * DTO de comunidad para la respuesta de detalle de usuario
 */
export class CommunityDto {
  id: string;
  name: string;
  isAdmin: boolean;

  constructor(id: string, name: string, isAdmin: boolean) {
    this.id = id;
    this.name = name;
    this.isAdmin = isAdmin;
  }
}

/**
 * DTO de respuesta para detalle completo de usuario
 * Contiene toda la información para mostrar en el panel de detalle
 */
export class UserDetailResponseDto {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  city: string;
  countryCode: string;
  communities: CommunityDto[];

  constructor(
    id: string,
    fullName: string,
    username: string,
    phone: string,
    city: string,
    countryCode: string,
    communities: CommunityDto[],
  ) {
    this.id = id;
    this.fullName = fullName;
    this.username = username;
    this.phone = phone;
    this.city = city;
    this.countryCode = countryCode;
    this.communities = communities;
  }
}
