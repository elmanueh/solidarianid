import { IDatabaseSeeder } from '@solidarianid/testing';
import { DataSource } from 'typeorm';

export class PostgreSQLSeeder implements IDatabaseSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async clean(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      throw new Error('DataSource is not initialized');
    }

    const entities = this.dataSource.entityMetadatas;

    await this.dataSource.query('SET session_replication_role = replica;');

    for (const entity of entities) {
      const repository = this.dataSource.getRepository(entity.name);
      await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
    }

    await this.dataSource.query('SET session_replication_role = DEFAULT;');
  }

  async seedAll(): Promise<void> {
    await this.clean();
    // Add your specific seed methods here
    // Example: await this.seedUsers();
    // Example: await this.seedCommunities();
  }
}
