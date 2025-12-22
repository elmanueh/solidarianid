import * as bcrypt from 'bcrypt';

/**
 * Static utility class for password hashing operations.
 *
 * This class provides a simple, stateless interface for hashing and comparing passwords
 * using bcrypt. It can be used directly from any layer without dependency injection.
 *
 * @example
 * const hashedPassword = await PasswordHasherUtil.hash('myPlainPassword');
 * const isMatch = await PasswordHasherUtil.compare('myPlainPassword', hashedPassword);
 */
export class PasswordHasherUtil {
  private static readonly SALT_ROUNDS = 10;

  /**
   * Hashes a plain text password using bcrypt.
   *
   * @param plainText The plain text password to hash
   * @returns A promise that resolves to the hashed password
   */
  static async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.SALT_ROUNDS);
  }

  /**
   * Compares a plain text password with a hashed password.
   *
   * @param plainText The plain text password to compare
   * @param hashedPassword The hashed password to compare against
   * @returns A promise that resolves to true if passwords match, false otherwise
   */
  static async compare(
    plainText: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
  }
}
