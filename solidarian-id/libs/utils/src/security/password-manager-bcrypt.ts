import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordManager } from './password-manager';

@Injectable()
export class PasswordManagerBcrypt extends PasswordManager {
  private static readonly SALT_ROUNDS = 10;

  async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, PasswordManagerBcrypt.SALT_ROUNDS);
  }
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
