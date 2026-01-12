/**
 * Interface for Database Seeders. Defines the contract for database seeders
 */
export interface IDatabaseSeeder {
  /**
   * Clean all data from the database
   */
  clean(): Promise<void>;

  /**
   * Seed all test data
   */
  seedAll(): Promise<void>;
}
