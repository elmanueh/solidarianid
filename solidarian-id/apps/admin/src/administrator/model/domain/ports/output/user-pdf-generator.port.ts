import type { Readable } from 'node:stream';
import { Either } from '@app/ddd/either';
import { PdfGenerationException } from '@app/admin/administrator/model/domain/errors/pdf-generation.exception';
import { Role } from '../../enums/role';

export interface UserReportPdfCommand {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  city: string;
  countryCode: string;
  communities: CommunityPdfCommand[];
  generatedAt: Date;
}

export interface CommunityPdfCommand {
  id: string;
  name: string;
  role: Role;
}

export abstract class UserPdfGeneratorPort {
  abstract generate(data: UserReportPdfCommand): Either<PdfGenerationException, Readable>;
}
