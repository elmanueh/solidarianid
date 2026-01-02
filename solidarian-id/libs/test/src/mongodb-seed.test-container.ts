import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { CauseRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { AdministratorEntity } from '@app/admin/auth/model/infrastructure/persistence/entities/administrator.entity';
import { IDatabaseSeeder } from '@solidarianid/testing';
import { Connection } from 'mongoose';

export class MongoDBSeeder implements IDatabaseSeeder {
  constructor(private readonly connection: Connection) {}

  async seedRequests(requests: CauseRequestEntity[] = []): Promise<void> {
    const requestsCollection = this.connection.collection('requests');

    const defaultRequests: CauseRequestEntity[] = [
      {
        _id: '2db201c8-5d35-462e-a1d1-985cb677725d',
        name: 'Test Request for Approval',
        description: 'This is a test request that will be used in E2E tests',
        status: RequestStatus.PENDING,
        type: RequestType.CAUSE,
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        ods: [1, 2],
      },
    ];
    const allRequests = [...defaultRequests, ...requests];
    await requestsCollection.insertMany(allRequests as any[]);
  }

  async seedAdministrators(admins: AdministratorEntity[] = []): Promise<void> {
    const adminsCollection = this.connection.collection('administrators');

    const defaultAdmins: AdministratorEntity[] = [
      {
        _id: 'c1ced31c-c321-4249-a86f-5299d5a7d672',
        fullname: 'Login Test User',
        email: 'login.test@solidarianid.org',
        phone: '+34612345100',
        password: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2', // Admin2024!Pass
      },
    ];

    const allAdmins = [...defaultAdmins, ...admins];
    await adminsCollection.insertMany(allAdmins as any[]);
  }

  async clean(): Promise<void> {
    if (!this.connection.db) {
      throw new Error('Database connection is not established');
    }

    const collections = await this.connection.db.collections();

    await Promise.all(collections.map(collection => collection.deleteMany({})));
  }

  async seedAll(): Promise<void> {
    await this.clean();
    await this.seedRequests();
    await this.seedAdministrators();
  }
}
