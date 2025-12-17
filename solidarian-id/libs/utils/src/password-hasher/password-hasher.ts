// src/infrastructure/adapters/bcrypt-password-hasher.adapter.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHasherPort } from './password-hasher.port';

@Injectable()
export class PasswordHasher implements PasswordHasherPort {
  private readonly SALT_ROUNDS = 10;

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.SALT_ROUNDS);
  }

  async compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }
}
