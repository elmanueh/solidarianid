/**
 * Interface for Database Test Containers. Defines the contract for database test containers
 */
export interface IDatabaseTestContainer {
  /**
   * Start the database container
   * @returns Connection string or configuration object
   */
  start(): Promise<string>;

  /**
   * Stop the database container
   */
  stop(): Promise<void>;

  /**
   * Get the connection string or configuration
   * @returns Connection string or configuration object
   */
  getConnectionString(): string;

  /**
   * Check if the container is running
   */
  isRunning(): boolean;
}
