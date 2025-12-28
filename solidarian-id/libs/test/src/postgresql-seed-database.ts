import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { IDatabaseSeeder } from '@solidarianid/testing';
import { DataSource } from 'typeorm';

export class PostgreSQLSeeder implements IDatabaseSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async seedUsers(users: UserEntity[] = []): Promise<void> {
    const userEntityTarget = this.dataSource.entityMetadatas.find(
      (meta) => meta.tableName === 'tbl_Usuarios',
    )?.target;

    if (!userEntityTarget) {
      throw new Error('UserEntity not found in DataSource');
    }

    const usersRepository = this.dataSource.getRepository(userEntityTarget);

    const defaultUsers: UserEntity[] = [
      {
        id: '4807f235-f4b4-41c0-939c-c97371219551',
        username: 'testUsername',
        mobilePhone: '+34000000000',
        passwordHash:
          '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // Hash de "TestPassword@123"
        city: 'Madrid',
        countryCode: 'ES',
      },
    ];

    const allUsers = [...defaultUsers, ...users];
    await usersRepository.insert(allUsers);
  }

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
    await this.seedUsers();
  }
}
