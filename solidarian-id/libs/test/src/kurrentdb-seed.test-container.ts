import { UserCreatedEvent } from '@app/users/domain/events/user-created.event';
import { BACKWARDS, END, jsonEvent, KurrentDBClient, Position, streamNameFilter } from '@kurrent/kurrentdb-client';
import { IDatabaseSeeder } from '@solidarianid/testing';

type UserSeed = {
  id: string;
  fullName: string;
  username: string;
  mobilePhone: string;
  passwordHash: string;
  city: string;
  countryCode: string;
};

const defaultUsers: UserSeed[] = [
  {
    id: '4807f235-f4b4-41c0-939c-c97371219551',
    fullName: 'Test User',
    username: 'testUsername',
    mobilePhone: '+34000000000',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Madrid',
    countryCode: 'ES',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    fullName: 'Usuario de Prueba Uno',
    username: 'test_user_1',
    mobilePhone: '+34612345678',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Madrid',
    countryCode: 'ES',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    fullName: 'Usuario de Prueba Dos',
    username: 'test_user_2',
    mobilePhone: '+34612345679',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Barcelona',
    countryCode: 'ES',
  },
  {
    id: 'a1b2c3d4-e5f6-4890-abcd-ef1234567001',
    fullName: 'Juan García López',
    username: 'volunteer_juan',
    mobilePhone: '+34611111111',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Madrid',
    countryCode: 'ES',
  },
  {
    id: 'a1b2c3d4-e5f6-4890-abcd-ef1234567002',
    fullName: 'María Rodríguez Fernández',
    username: 'volunteer_maria',
    mobilePhone: '+34622222222',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Barcelona',
    countryCode: 'ES',
  },
  {
    id: 'a1b2c3d4-e5f6-4890-abcd-ef1234567003',
    fullName: 'Pedro Martínez Sánchez',
    username: 'admin_pedro',
    mobilePhone: '+34633333333',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Valencia',
    countryCode: 'ES',
  },
  {
    id: 'a1b2c3d4-e5f6-4890-abcd-ef1234567004',
    fullName: 'Ana González Ruiz',
    username: 'volunteer_ana',
    mobilePhone: '+34644444444',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Sevilla',
    countryCode: 'ES',
  },
  {
    id: 'a1b2c3d4-e5f6-4890-abcd-ef1234567005',
    fullName: 'Carlos Hernández Díaz',
    username: 'volunteer_carlos',
    mobilePhone: '+34655555555',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Bilbao',
    countryCode: 'ES',
  },
  {
    id: 'a1b2c3d4-e5f6-4890-abcd-ef1234567006',
    fullName: 'Luis Fernández Torres',
    username: 'volunteer_luis',
    mobilePhone: '+34666666666',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Valencia',
    countryCode: 'ES',
  },
];

export class KurrentDBSeeder implements IDatabaseSeeder {
  constructor(private readonly eventStore: KurrentDBClient) {}

  async clean(): Promise<void> {
    const userIds = Array.from(defaultUsers.map(user => user.id));
    const streamNames = Array.from(new Set(userIds.map(userId => this.userStream(userId))));
    await Promise.allSettled(streamNames.map(streamName => this.eventStore.deleteStream(streamName)));
  }

  async seedAll(): Promise<void> {
    await this.clean();
    await this.seedUsers();
  }

  async seedUsers(users: UserSeed[] = []): Promise<void> {
    const allUsers = [...defaultUsers, ...users];

    for (const user of allUsers) {
      await this.eventStore.appendToStream(
        this.userStream(user.id),
        jsonEvent({
          type: UserCreatedEvent.name,
          data: {
            occurredOn: new Date(),
            type: UserCreatedEvent.name,
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            mobilePhone: user.mobilePhone,
            passwordHash: user.passwordHash,
            city: user.city,
            countryCode: user.countryCode,
            preferredSDGs: [],
            preferredCategories: [],
            durationPreferences: ['any'],
            notificationsEnabled: true,
          },
        }),
      );
    }
  }

  async getLatestUserCheckpointPosition(): Promise<Position> {
    const events = this.eventStore.readAll({
      fromPosition: END,
      direction: BACKWARDS,
      maxCount: 1,
      filter: streamNameFilter({ prefixes: ['user-'] }),
    });

    for await (const event of events) {
      const position = event.event?.position;
      if (position) return position;
    }

    throw new Error('Unable to resolve latest user checkpoint position from KurrentDB.');
  }

  private userStream(userId: string): string {
    return `user-${userId}`;
  }
}
