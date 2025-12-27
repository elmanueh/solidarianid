import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { IDatabaseSeeder } from '@solidarianid/testing';
import { Connection } from 'mongoose';

export class MongoDBSeeder implements IDatabaseSeeder {
  constructor(private readonly connection: Connection) {}

  async seedRequests(): Promise<void> {
    const requestsCollection = this.connection.collection('requests');

    const requests = [
      {
        _id: '2db201c8-5d35-462e-a1d1-985cb677725d',
        name: 'Test Request for Approval',
        description: 'This is a test request that will be used in E2E tests',
        status: RequestStatus.PENDING,
        type: RequestType.CAUSE,
        startDate: new Date('2024-02-01T00:00:00.000Z'),
        endDate: new Date('2024-03-01T00:00:00.000Z'),
        ods: [1, 2],
      },
    ];

    await requestsCollection.insertMany(requests as any[]);
  }

  async clean(): Promise<void> {
    if (!this.connection.db) {
      throw new Error('Database connection is not established');
    }

    const collections = await this.connection.db.collections();

    await Promise.all(
      collections.map((collection) => collection.deleteMany({})),
    );
  }

  async seedAll(): Promise<void> {
    await this.clean();
    await this.seedRequests();
    // Add more seed methods as needed
  }
}
