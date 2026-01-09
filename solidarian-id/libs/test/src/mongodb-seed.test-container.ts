import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { ActionRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/action-request.entity';
import { CauseRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { CommunityRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/community-request.entity';
import { AdministratorEntity } from '@app/admin/auth/model/infrastructure/persistence/entities/administrator.entity';
import { IDatabaseSeeder } from '@solidarianid/testing';
import { Connection } from 'mongoose';

// MongoDB IDs Constants
const USER_IDS = {
  JUAN: 'a1b2c3d4-e5f6-4890-abcd-ef1234567001',
  MARIA: 'a1b2c3d4-e5f6-4890-abcd-ef1234567002',
  PEDRO: 'a1b2c3d4-e5f6-4890-abcd-ef1234567003',
  ANA: 'a1b2c3d4-e5f6-4890-abcd-ef1234567004',
  CARLOS: 'a1b2c3d4-e5f6-4890-abcd-ef1234567005',
  LUIS: 'a1b2c3d4-e5f6-4890-abcd-ef1234567006',
};

const COMMUNITY_IDS = {
  AFRICA: 'f1e6d3c4-8b2a-4f4b-9c4d-2e5f6a7b8c9d',
  MADRID: 'b1b2c3d4-e5f6-4890-abcd-ef1234567002',
  HUMANITARIA: 'b1b2c3d4-e5f6-4890-abcd-ef1234567003',
  TEST_COMMUNITY_1: '650e8400-e29b-41d4-a716-446655440001',
};

const CAUSE_REQUEST_IDS = {
  AGUA_KENIA_PENDING: '2db201c8-5d35-462e-a1d1-985cb677725d',
  ODS_1_APPROVED: '11111111-1111-1111-1111-111111111111',
  ODS_2_APPROVED: '22222222-2222-2222-2222-222222222222',
  ODS_1_2_APPROVED: '33333333-3333-3333-3333-333333333333',
  ODS_3_PENDING: '44444444-4444-4444-4444-444444444444',
  BANCO_ALIMENTOS: 'c1b2c3d4-e5f6-4890-abcd-ef1234567003',
  EMERGENCIA_VALENCIA: 'c1b2c3d4-e5f6-4890-abcd-ef1234567005',
};

const ACTION_REQUEST_IDS = {
  TEST_ACTION: '3ac201c8-5d35-462e-a1d1-985cb677725e',
  POZO_MAKUENI: 'd1b2c3d4-e5f6-4890-abcd-ef1234567001',
  RECOGIDA_NORTE: 'd1b2c3d4-e5f6-4890-abcd-ef1234567004',
  LIMPIEZA_PAIPORTA: 'd1b2c3d4-e5f6-4890-abcd-ef1234567007',
};

const ADMINISTRATOR_IDS = {
  TEST_ADMIN: 'c1ced31c-c321-4249-a86f-5299d5a7d672',
  MAIN_ADMIN: 'admin001-1234-4567-8901-abcdef123456',
};

const REPORT_USER_IDS = {
  TEST_USER_ONE: '550e8400-e29b-41d4-a716-446655440000',
  TEST_USER_TWO: '550e8400-e29b-41d4-a716-446655440001',
};

const COUNTRY_TEST_USER_IDS = {
  USER_ES_1: USER_IDS.ANA, // España 1
  USER_ES_2: USER_IDS.CARLOS, // España 2
  USER_ES_3: USER_IDS.LUIS, // España 3
  USER_FR_1: USER_IDS.MARIA, // Francia 1
  USER_FR_2: USER_IDS.PEDRO, // Francia 2
  USER_PT_1: USER_IDS.JUAN, // Portugal 1
};

export class MongoDBSeeder implements IDatabaseSeeder {
  constructor(private readonly connection: Connection) {}

  async seedRequests(requests: CauseRequestEntity[] = []): Promise<void> {
    const requestsCollection = this.connection.collection('requests');

    const defaultCommunityRequests: CommunityRequestEntity[] = [
      {
        _id: COMMUNITY_IDS.AFRICA,
        name: 'Amigos por África',
        description: 'Comunidad dedicada a proyectos solidarios en el continente africano',
        status: RequestStatus.APPROVED,
        type: RequestType.COMMUNITY,
        userId: USER_IDS.JUAN,
        reason: 'Approved for testing',
      },
      {
        _id: COMMUNITY_IDS.MADRID,
        name: 'Voluntarios Sin Fronteras Madrid',
        description: 'Grupo local de voluntarios en la Comunidad de Madrid',
        status: RequestStatus.APPROVED,
        type: RequestType.COMMUNITY,
        userId: USER_IDS.PEDRO,
        reason: 'Approved for testing',
      },
    ];

    // Causas para test de findCausesGroupByOds - con ODS variados
    const defaultCauseRequests: CauseRequestEntity[] = [
      {
        _id: CAUSE_REQUEST_IDS.AGUA_KENIA_PENDING,
        name: 'Agua potable para Kenia',
        description: 'Construcción de pozos de agua en comunidades rurales',
        status: RequestStatus.PENDING,
        type: RequestType.CAUSE,
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        duration: 180,
        ods: [6, 3], // ODS 6: Agua limpia y saneamiento, ODS 3: Salud y bienestar
        userId: USER_IDS.JUAN,
        communityId: COMMUNITY_IDS.AFRICA,
      },
      {
        _id: CAUSE_REQUEST_IDS.ODS_1_APPROVED,
        name: 'Erradicación de la pobreza',
        description: 'Programa integral contra la pobreza extrema',
        status: RequestStatus.APPROVED,
        type: RequestType.CAUSE,
        startDate: new Date(),
        duration: 365,
        ods: [1], // ODS 1: Fin de la pobreza
        userId: USER_IDS.MARIA,
        communityId: COMMUNITY_IDS.MADRID,
      },
      {
        _id: CAUSE_REQUEST_IDS.ODS_2_APPROVED,
        name: 'Seguridad alimentaria',
        description: 'Banco de alimentos para familias vulnerables',
        status: RequestStatus.APPROVED,
        type: RequestType.CAUSE,
        startDate: new Date(),
        duration: 90,
        ods: [2], // ODS 2: Hambre cero
        userId: USER_IDS.PEDRO,
        communityId: COMMUNITY_IDS.MADRID,
      },
      {
        _id: CAUSE_REQUEST_IDS.ODS_1_2_APPROVED,
        name: 'Programa integral pobreza y alimentación',
        description: 'Atención integral a familias en situación vulnerable',
        status: RequestStatus.APPROVED,
        type: RequestType.CAUSE,
        startDate: new Date(),
        duration: 180,
        ods: [1, 2], // ODS 1 y 2: Pobreza y Hambre
        userId: USER_IDS.ANA,
        communityId: COMMUNITY_IDS.HUMANITARIA,
      },
      {
        _id: CAUSE_REQUEST_IDS.ODS_3_PENDING,
        name: 'Programa de salud comunitaria',
        description: 'Atención sanitaria en zonas rurales - pendiente de aprobación',
        status: RequestStatus.PENDING,
        type: RequestType.CAUSE,
        startDate: new Date(),
        duration: 120,
        ods: [3], // ODS 3: Salud y bienestar
        userId: USER_IDS.CARLOS,
        communityId: COMMUNITY_IDS.HUMANITARIA,
      },
      {
        _id: CAUSE_REQUEST_IDS.BANCO_ALIMENTOS,
        name: 'Banco de alimentos navideño',
        description: 'Recogida de alimentos para familias vulnerables en Navidad',
        status: RequestStatus.APPROVED,
        type: RequestType.CAUSE,
        startDate: new Date('2025-12-01'),
        duration: 30,
        ods: [1, 2], // Pobreza y Hambre
        userId: USER_IDS.PEDRO,
        communityId: COMMUNITY_IDS.MADRID,
      },
      {
        _id: CAUSE_REQUEST_IDS.EMERGENCIA_VALENCIA,
        name: 'Emergencia inundaciones Valencia',
        description: 'Ayuda a afectados por las inundaciones de 2024',
        status: RequestStatus.APPROVED,
        type: RequestType.CAUSE,
        startDate: new Date('2024-10-30'),
        duration: 90,
        ods: [11, 13], // ODS 11: Ciudades sostenibles, ODS 13: Acción por el clima
        userId: USER_IDS.MARIA,
        communityId: COMMUNITY_IDS.HUMANITARIA,
      },
    ];

    const defaultActionRequests: ActionRequestEntity[] = [
      {
        _id: ACTION_REQUEST_IDS.TEST_ACTION,
        name: 'Acción de prueba E2E',
        description: 'Acción para pruebas end-to-end del sistema',
        status: RequestStatus.APPROVED,
        type: RequestType.ACTION,
        reason: 'Approved for testing',
        createdAt: new Date(),
        updatedAt: new Date(),
        causeId: CAUSE_REQUEST_IDS.AGUA_KENIA_PENDING,
        events: [
          {
            place: {
              city: 'Madrid',
              countryCode: 'ES',
              direction: 'Calle de Alcalá, 123',
            },
            name: 'Evento inicial de prueba',
            description: 'Primer evento para validación de la acción',
            initialDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
          },
        ],
        objectives: [
          {
            name: 'Objetivo de prueba',
            description: 'Objetivo inicial para validación del sistema',
            quantity: 100,
            unit: 'unidades',
            currentAmount: 25,
          },
        ],
        userId: USER_IDS.JUAN,
      },
      {
        _id: ACTION_REQUEST_IDS.POZO_MAKUENI,
        name: 'Perforación pozo en aldea Makueni',
        description: 'Construcción de pozo de agua potable de 50m de profundidad',
        status: RequestStatus.APPROVED,
        type: RequestType.ACTION,
        reason: 'Proyecto prioritario aprobado',
        createdAt: new Date(),
        updatedAt: new Date(),
        causeId: CAUSE_REQUEST_IDS.ODS_1_APPROVED,
        events: [
          {
            place: {
              city: 'Makueni',
              countryCode: 'KE',
              direction: 'Aldea rural de Makueni',
            },
            name: 'Inicio de perforación',
            description: 'Comienzo de trabajos de perforación del pozo',
            initialDate: new Date('2025-03-15'),
          },
        ],
        objectives: [
          {
            name: 'Recaudación económica',
            description: 'Fondos para materiales y mano de obra',
            quantity: 15000,
            unit: 'EUR',
            currentAmount: 8500,
          },
          {
            name: 'Voluntarios técnicos',
            description: 'Ingenieros y técnicos para supervisión',
            quantity: 5,
            unit: 'personas',
            currentAmount: 3,
          },
        ],
        userId: USER_IDS.MARIA,
      },
    ];

    const allRequests = [...defaultCommunityRequests, ...defaultCauseRequests, ...defaultActionRequests, ...requests];
    await requestsCollection.insertMany(allRequests as any[]);
  }

  async seedAdministrators(admins: AdministratorEntity[] = []): Promise<void> {
    const adminsCollection = this.connection.collection('administrators');

    const defaultAdmins: AdministratorEntity[] = [
      {
        _id: ADMINISTRATOR_IDS.TEST_ADMIN,
        fullname: 'Login Test User',
        email: 'login.test@solidarianid.org',
        phone: '+34612345100',
        password: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2', // Admin2024!Pass
      },
      {
        _id: ADMINISTRATOR_IDS.MAIN_ADMIN,
        fullname: 'Administrador Principal',
        email: 'admin@solidarianid.org',
        phone: '+34600000000',
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

  async seedUsers(users: any[] = []): Promise<void> {
    const usersCollection = this.connection.collection('users');

    const defaultUsers: any[] = [
      {
        _id: REPORT_USER_IDS.TEST_USER_ONE,
        fullName: 'Usuario de Prueba Uno',
        username: 'test_user_1',
        phone: '+34612345678',
        location: {
          city: 'Madrid',
          countryCode: 'ES',
        },
        communityMemberships: [
          {
            communityId: COMMUNITY_IDS.TEST_COMMUNITY_1,
            communityName: 'Comunidad de Prueba 1',
            isAdmin: false,
          },
        ],
      },
      {
        _id: REPORT_USER_IDS.TEST_USER_TWO,
        fullName: 'Usuario de Prueba Dos',
        username: 'test_user_2',
        phone: '+34612345679',
        location: {
          city: 'Barcelona',
          countryCode: 'ES',
        },
        communityMemberships: [],
      },
      {
        _id: USER_IDS.JUAN,
        fullName: 'Juan García López',
        username: 'volunteer_juan',
        phone: '+351611111111',
        location: {
          city: 'Lisboa',
          countryCode: 'PT',
        },
        communityMemberships: [
          {
            communityId: COMMUNITY_IDS.AFRICA,
            communityName: 'Amigos por África',
            isAdmin: true,
          },
          {
            communityId: COMMUNITY_IDS.MADRID,
            communityName: 'Voluntarios Sin Fronteras Madrid',
            isAdmin: false,
          },
        ],
      },
      {
        _id: USER_IDS.MARIA,
        fullName: 'María Rodríguez Fernández',
        username: 'volunteer_maria',
        phone: '+33622222222',
        location: {
          city: 'París',
          countryCode: 'FR',
        },
        communityMemberships: [
          {
            communityId: COMMUNITY_IDS.HUMANITARIA,
            communityName: 'Ayuda Humanitaria España',
            isAdmin: true,
          },
        ],
      },
      {
        _id: USER_IDS.PEDRO,
        fullName: 'Pedro Martínez Sánchez',
        username: 'admin_pedro',
        phone: '+33633333333',
        location: {
          city: 'Lyon',
          countryCode: 'FR',
        },
        communityMemberships: [
          {
            communityId: COMMUNITY_IDS.MADRID,
            communityName: 'Voluntarios Sin Fronteras Madrid',
            isAdmin: true,
          },
        ],
      },
      {
        _id: USER_IDS.ANA,
        fullName: 'Ana Jiménez Ruiz',
        username: 'volunteer_ana',
        phone: '+34644444444',
        location: {
          city: 'Madrid',
          countryCode: 'ES',
        },
        communityMemberships: [
          {
            communityId: COMMUNITY_IDS.HUMANITARIA,
            communityName: 'Ayuda Humanitaria España',
            isAdmin: false,
          },
        ],
      },
      {
        _id: USER_IDS.CARLOS,
        fullName: 'Carlos López Vázquez',
        username: 'volunteer_carlos',
        phone: '+34655555555',
        location: {
          city: 'Barcelona',
          countryCode: 'ES',
        },
        communityMemberships: [],
      },
      {
        _id: USER_IDS.LUIS,
        fullName: 'Luis Fernández Torres',
        username: 'volunteer_luis',
        phone: '+34666666666',
        location: {
          city: 'Valencia',
          countryCode: 'ES',
        },
        communityMemberships: [],
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const allUsers = [...defaultUsers, ...users];
    await usersCollection.insertMany(allUsers);
  }

  async seedAll(): Promise<void> {
    await this.clean();
    await this.seedRequests();
    await this.seedAdministrators();
    await this.seedUsers();
  }
}

export {
  USER_IDS as MONGO_USER_IDS,
  COMMUNITY_IDS as MONGO_COMMUNITY_IDS,
  CAUSE_REQUEST_IDS as MONGO_CAUSE_REQUEST_IDS,
  ACTION_REQUEST_IDS as MONGO_ACTION_REQUEST_IDS,
  ADMINISTRATOR_IDS as MONGO_ADMINISTRATOR_IDS,
  REPORT_USER_IDS as MONGO_REPORT_USER_IDS,
  COUNTRY_TEST_USER_IDS as MONGO_COUNTRY_TEST_USER_IDS,
};
