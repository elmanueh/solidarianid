/**
 * DTO con los datos necesarios para generar el PDF del reporte de usuario
 */
export interface UserReportPdfDto {
  id: string;
  username: string;
  phone: string;
  city: string;
  countryCode: string;
  countryName: string;
  communities: CommunityPdfDto[];
  generatedAt: Date;
}

/**
 * DTO de comunidad para el PDF
 */
export interface CommunityPdfDto {
  id: string;
  name: string;
  isAdmin: boolean;
}
