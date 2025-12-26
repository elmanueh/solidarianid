import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordService } from '../password.service';

@Injectable()
export class PasswordServiceImpl extends PasswordService {
  private static readonly SALT_ROUNDS = 10;

  hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, PasswordServiceImpl.SALT_ROUNDS);
  }
  comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
