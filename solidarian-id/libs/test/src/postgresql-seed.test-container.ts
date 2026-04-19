import { MemberType } from '@app/communities/domain/model/enums/member-type';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';
import { IDatabaseSeeder } from '@solidarianid/testing';
import { DataSource } from 'typeorm';

// Interfaces para tipar los datos de seed de communities
interface CommunityUserSeedData {
  id: string;
  fullName: string;
  email?: string;
  mobilePhone?: string;
}

interface CommunitySeedData {
  id: string;
  name: string;
  description: string;
}

interface RequestSeedData {
  id: string;
  name: string;
  description: string;
  status: RequestStatus;
  type: RequestType;
  reason?: string;
  user: UserEntity;
}

interface CauseSeedData {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  ods: number[];
  communityId: string;
  initialDate?: Date;
}

interface ActionSeedData {
  id: string;
  name: string;
  description: string;
  causeId: string;
}

interface ObjectiveSeedData {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  currentAmount: number;
  actionId: string;
}

interface EventSeedData {
  id: string;
  name: string;
  description: string;
  initialDate: Date;
  placeDirection: string;
  placeCity: string;
  placeCountryCode: string;
  actionId: string;
}

interface EventUserSeedData {
  eventId: string;
  userId: string;
  email?: string;
  mobilePhone?: string;
  fullname: string;
}

interface ObjectiveUserSeedData {
  name: string;
  actionId: string;
  userId: string;
  email?: string;
  mobilePhone?: string;
  fullname: string;
}

// UUIDs CONSTANTES (reutilizables)
const USER_IDS = {
  JUAN: 'a1b2c3d4-e5f6-4890-abcd-ef1234567001',
  MARIA: 'a1b2c3d4-e5f6-4890-abcd-ef1234567002',
  PEDRO: 'a1b2c3d4-e5f6-4890-abcd-ef1234567003',
  ANA: 'a1b2c3d4-e5f6-4890-abcd-ef1234567004',
  CARLOS: 'a1b2c3d4-e5f6-4890-abcd-ef1234567005',
};

const COMMUNITY_IDS = {
  AFRICA: 'b1b2c3d4-e5f6-4890-abcd-ef1234567001',
  MADRID: 'b1b2c3d4-e5f6-4890-abcd-ef1234567002',
  HUMANITARIA: 'b1b2c3d4-e5f6-4890-abcd-ef1234567003',
};

const CAUSE_IDS = {
  AGUA_KENIA: 'c1b2c3d4-e5f6-4890-abcd-ef1234567001',
  ESCUELAS_TANZANIA: 'c1b2c3d4-e5f6-4890-abcd-ef1234567002',
  BANCO_ALIMENTOS: 'c1b2c3d4-e5f6-4890-abcd-ef1234567003',
  APOYO_ESCOLAR: 'c1b2c3d4-e5f6-4890-abcd-ef1234567004',
  EMERGENCIA_VALENCIA: 'c1b2c3d4-e5f6-4890-abcd-ef1234567005',
};

const ACTION_IDS = {
  POZO_MAKUENI: 'd1b2c3d4-e5f6-4890-abcd-ef1234567001',
  PURIFICACION_KITUI: 'd1b2c3d4-e5f6-4890-abcd-ef1234567002',
  ESCUELA_DODOMA: 'd1b2c3d4-e5f6-4890-abcd-ef1234567003',
  RECOGIDA_NORTE: 'd1b2c3d4-e5f6-4890-abcd-ef1234567004',
  REPARTO_VALLECAS: 'd1b2c3d4-e5f6-4890-abcd-ef1234567005',
  CLASES_MATES: 'd1b2c3d4-e5f6-4890-abcd-ef1234567006',
  LIMPIEZA_PAIPORTA: 'd1b2c3d4-e5f6-4890-abcd-ef1234567007',
  RECOGIDA_ENSERES: 'd1b2c3d4-e5f6-4890-abcd-ef1234567008',
};

const OBJECTIVE_IDS = {
  OBJ_001: 'e1b2c3d4-e5f6-4890-abcd-ef1234567001',
  OBJ_002: 'e1b2c3d4-e5f6-4890-abcd-ef1234567002',
  OBJ_003: 'e1b2c3d4-e5f6-4890-abcd-ef1234567003',
  OBJ_004: 'e1b2c3d4-e5f6-4890-abcd-ef1234567004',
  OBJ_005: 'e1b2c3d4-e5f6-4890-abcd-ef1234567005',
  OBJ_006: 'e1b2c3d4-e5f6-4890-abcd-ef1234567006',
  OBJ_007: 'e1b2c3d4-e5f6-4890-abcd-ef1234567007',
  OBJ_008: 'e1b2c3d4-e5f6-4890-abcd-ef1234567008',
  OBJ_009: 'e1b2c3d4-e5f6-4890-abcd-ef1234567009',
};

const EVENT_IDS = {
  EVENT_001: 'f1b2c3d4-e5f6-4890-abcd-ef1234567001',
  EVENT_002: 'f1b2c3d4-e5f6-4890-abcd-ef1234567002',
  EVENT_003: 'f1b2c3d4-e5f6-4890-abcd-ef1234567003',
  EVENT_004: 'f1b2c3d4-e5f6-4890-abcd-ef1234567004',
  EVENT_005: 'f1b2c3d4-e5f6-4890-abcd-ef1234567005',
};

const REQUEST_IDS = {
  COMMUNITY_PENDING_1: '01b2c3d4-e5f6-4890-abcd-ef1234567001',
  COMMUNITY_PENDING_2: '01b2c3d4-e5f6-4890-abcd-ef1234567002',
  COMMUNITY_APPROVED: '01b2c3d4-e5f6-4890-abcd-ef1234567003',
  COMMUNITY_REJECTED: '01b2c3d4-e5f6-4890-abcd-ef1234567004',
  CAUSE_PENDING_1: '02b2c3d4-e5f6-4890-abcd-ef1234567001',
  CAUSE_PENDING_2: '02b2c3d4-e5f6-4890-abcd-ef1234567002',
  CAUSE_APPROVED: '02b2c3d4-e5f6-4890-abcd-ef1234567003',
  ACTION_PENDING_1: '03b2c3d4-e5f6-4890-abcd-ef1234567001',
  ACTION_PENDING_2: '03b2c3d4-e5f6-4890-abcd-ef1234567002',
  ACTION_APPROVED: '03b2c3d4-e5f6-4890-abcd-ef1234567003',
  ACTION_REJECTED: '03b2c3d4-e5f6-4890-abcd-ef1234567004',
  NON_EXISTENT: 'ffffffff-ffff-4fff-bfff-ffffffffffff',
};

// DATOS DE USUARIOS (compartidos entre Users App y Communities App)
const DEFAULT_USERS_DATA = [
  {
    id: '4807f235-f4b4-41c0-939c-c97371219551',
    username: 'testUsername',
    email: 'test@solidarianid.org',
    fullName: 'Test User',
    mobilePhone: '+34000000000',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2', // Admin2024!Pass
    city: 'Madrid',
    countryCode: 'ES',
  },
  {
    id: USER_IDS.JUAN,
    username: 'volunteer_juan',
    email: 'juan@solidarianid.org',
    fullName: 'Juan García López',
    mobilePhone: '+34611111111',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Madrid',
    countryCode: 'ES',
  },
  {
    id: USER_IDS.MARIA,
    username: 'volunteer_maria',
    email: 'maria@solidarianid.org',
    fullName: 'María Rodríguez Fernández',
    mobilePhone: '+34622222222',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Barcelona',
    countryCode: 'ES',
  },
  {
    id: USER_IDS.PEDRO,
    username: 'admin_pedro',
    email: 'pedro@solidarianid.org',
    fullName: 'Pedro Martínez Sánchez',
    mobilePhone: '+34633333333',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Valencia',
    countryCode: 'ES',
  },
  {
    id: USER_IDS.ANA,
    username: 'volunteer_ana',
    email: 'ana@solidarianid.org',
    fullName: 'Ana González Ruiz',
    mobilePhone: '+34644444444',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Sevilla',
    countryCode: 'ES',
  },
  {
    id: USER_IDS.CARLOS,
    username: 'volunteer_carlos',
    email: 'carlos@solidarianid.org',
    fullName: 'Carlos Hernández Díaz',
    mobilePhone: '+34655555555',
    passwordHash: '$2b$10$zesypsEg9VMRGzbVdxu/quhEhp.OTBQ0Eb.QfwBqP2KiIg/uvi8e2',
    city: 'Bilbao',
    countryCode: 'ES',
  },
];

export class PostgreSQLSeeder implements IDatabaseSeeder {
  constructor(private readonly dataSource: DataSource) {}

  // USERS APP SEED (tabla tbl_Usuarios)
  async seedUsers(users: UserEntity[] = []): Promise<void> {
    const userEntityTarget = this.dataSource.entityMetadatas.find(meta => meta.tableName === 'tbl_Usuarios')?.target;

    if (!userEntityTarget) {
      throw new Error('UserEntity not found in DataSource');
    }

    const usersRepository = this.dataSource.getRepository(userEntityTarget);
    const allUsers = [...DEFAULT_USERS_DATA, ...users];
    await usersRepository.insert(allUsers);

    // Crear preferencias por defecto para cada usuario
    const preferencesEntityTarget = this.dataSource.entityMetadatas.find(
      meta => meta.tableName === 'user_preferences',
    )?.target;

    if (preferencesEntityTarget) {
      const preferencesRepository = this.dataSource.getRepository(preferencesEntityTarget);
      const defaultPreferences = allUsers.map(user => ({
        userId: user.id,
        preferredSDGs: [],
        preferredCategories: [],
        durationPreferences: ['any'],
        notificationsEnabled: true,
      }));
      await preferencesRepository.insert(defaultPreferences);
    }
  }

  async getUserProjectionIds(): Promise<string[]> {
    const repo = this.dataSource.getRepository(UserProjectionEntity);
    return repo.find().then(users => users.map(u => u.id));
  }

  async seedUsersProjection(): Promise<void> {
    const repo = this.dataSource.getRepository(UserProjectionEntity);
    await repo.clear();

    const defaultUsersProjection: UserProjectionEntity[] = DEFAULT_USERS_DATA.map(user => ({
      id: user.id,
      username: user.username,
      mobilePhone: user.mobilePhone,
    }));

    await repo.save(defaultUsersProjection);
  }

  // COMMUNITIES APP SEEDS

  /**
   * Seed de usuarios para el microservicio de communities
   * (mismos IDs que Users App para consistencia)
   */
  async seedCommunityUsers(users: CommunityUserSeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('UserEntity');

    const defaultUsers: CommunityUserSeedData[] = DEFAULT_USERS_DATA.map(u => ({
      id: u.id,
      fullName: u.fullName,
      email: u.email,
      mobilePhone: u.mobilePhone,
    }));

    await repo.insert([...defaultUsers, ...users]);
  }

  /**
   * Seed de comunidades
   */
  async seedCommunities(communities: CommunitySeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('CommunityEntity');

    const defaultCommunities: CommunitySeedData[] = [
      {
        id: COMMUNITY_IDS.AFRICA,
        name: 'Amigos por África',
        description: 'Comunidad dedicada a proyectos solidarios en el continente africano',
      },
      {
        id: COMMUNITY_IDS.MADRID,
        name: 'Voluntarios Sin Fronteras Madrid',
        description: 'Grupo local de voluntarios en la Comunidad de Madrid',
      },
      {
        id: COMMUNITY_IDS.HUMANITARIA,
        name: 'Ayuda Humanitaria España',
        description: 'Red de voluntarios para emergencias humanitarias nacionales',
      },
    ];

    await repo.insert([...defaultCommunities, ...communities]);
  }

  /**
   * Seed de causas benéficas (vinculadas a ODS)
   */
  async seedCauses(causes: CauseSeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('CauseEntity');

    const defaultCauses: CauseSeedData[] = [
      // Causas de "Amigos por África"
      {
        id: CAUSE_IDS.AGUA_KENIA,
        name: 'Agua potable para Kenia',
        description: 'Construcción de pozos de agua en comunidades rurales',
        durationDays: 180,
        ods: [6, 3],
        communityId: COMMUNITY_IDS.AFRICA,
        initialDate: new Date('2024-06-01'),
      },
      {
        id: CAUSE_IDS.ESCUELAS_TANZANIA,
        name: 'Escuelas en Tanzania',
        description: 'Construcción y equipamiento de escuelas primarias',
        durationDays: 365,
        ods: [4, 10],
        communityId: COMMUNITY_IDS.AFRICA,
        initialDate: new Date('2024-03-15'),
      },
      // Causas de "Voluntarios Sin Fronteras Madrid"
      {
        id: CAUSE_IDS.BANCO_ALIMENTOS,
        name: 'Banco de alimentos navideño',
        description: 'Recogida de alimentos para familias vulnerables',
        durationDays: 30,
        ods: [1, 2],
        communityId: COMMUNITY_IDS.MADRID,
        initialDate: new Date('2025-12-01'),
      },
      {
        id: CAUSE_IDS.APOYO_ESCOLAR,
        name: 'Apoyo escolar infantil',
        description: 'Clases de refuerzo para niños en riesgo de exclusión',
        durationDays: 270,
        ods: [4, 10],
        communityId: COMMUNITY_IDS.MADRID,
        initialDate: new Date('2024-09-01'),
      },
      // Causas de "Ayuda Humanitaria España"
      {
        id: CAUSE_IDS.EMERGENCIA_VALENCIA,
        name: 'Emergencia inundaciones Valencia',
        description: 'Ayuda a afectados por las inundaciones de 2024',
        durationDays: 90,
        ods: [11, 13],
        communityId: COMMUNITY_IDS.HUMANITARIA,
        initialDate: new Date('2024-10-30'),
      },
    ];

    await repo.insert([...defaultCauses, ...causes]);
  }

  /**
   * Seed de acciones (proyectos concretos dentro de causas)
   */
  async seedActions(actions: ActionSeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('ActionEntity');

    const defaultActions: ActionSeedData[] = [
      // Acciones de "Agua potable para Kenia"
      {
        id: ACTION_IDS.POZO_MAKUENI,
        name: 'Pozo en aldea Makueni',
        description: 'Perforación de pozo de 50m de profundidad',
        causeId: CAUSE_IDS.AGUA_KENIA,
      },
      {
        id: ACTION_IDS.PURIFICACION_KITUI,
        name: 'Sistema de purificación Kitui',
        description: 'Instalación de filtros de agua potable',
        causeId: CAUSE_IDS.AGUA_KENIA,
      },
      // Acciones de "Escuelas en Tanzania"
      {
        id: ACTION_IDS.ESCUELA_DODOMA,
        name: 'Escuela primaria Dodoma',
        description: 'Construcción de 4 aulas y baños',
        causeId: CAUSE_IDS.ESCUELAS_TANZANIA,
      },
      // Acciones de "Banco de alimentos navideño"
      {
        id: ACTION_IDS.RECOGIDA_NORTE,
        name: 'Recogida supermercados Zona Norte',
        description: 'Puntos de recogida en supermercados del norte de Madrid',
        causeId: CAUSE_IDS.BANCO_ALIMENTOS,
      },
      {
        id: ACTION_IDS.REPARTO_VALLECAS,
        name: 'Reparto a familias Vallecas',
        description: 'Distribución de lotes de alimentos',
        causeId: CAUSE_IDS.BANCO_ALIMENTOS,
      },
      // Acciones de "Apoyo escolar infantil"
      {
        id: ACTION_IDS.CLASES_MATES,
        name: 'Clases de matemáticas',
        description: 'Refuerzo de matemáticas para primaria',
        causeId: CAUSE_IDS.APOYO_ESCOLAR,
      },
      // Acciones de "Emergencia inundaciones Valencia"
      {
        id: ACTION_IDS.LIMPIEZA_PAIPORTA,
        name: 'Limpieza de viviendas Paiporta',
        description: 'Brigadas de limpieza de casas afectadas',
        causeId: CAUSE_IDS.EMERGENCIA_VALENCIA,
      },
      {
        id: ACTION_IDS.RECOGIDA_ENSERES,
        name: 'Recogida de enseres',
        description: 'Donación de muebles y electrodomésticos',
        causeId: CAUSE_IDS.EMERGENCIA_VALENCIA,
      },
    ];

    await repo.insert([...defaultActions, ...actions]);
  }

  /**
   * Seed de objetivos (metas cuantificables de las acciones)
   */
  async seedObjectives(objectives: ObjectiveSeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('ObjectiveEntity');

    const defaultObjectives: ObjectiveSeedData[] = [
      {
        name: 'Recaudación económica',
        description: 'Fondos para materiales y mano de obra',
        quantity: 15000,
        unit: 'EUR',
        currentAmount: 8500,
        actionId: ACTION_IDS.POZO_MAKUENI,
      },
      {
        name: 'Voluntarios técnicos',
        description: 'Ingenieros y técnicos para supervisión',
        quantity: 5,
        unit: 'personas',
        currentAmount: 3,
        actionId: ACTION_IDS.POZO_MAKUENI,
      },
      {
        name: 'Kilos de alimentos',
        description: 'Meta de alimentos no perecederos',
        quantity: 5000,
        unit: 'kg',
        currentAmount: 3200,
        actionId: ACTION_IDS.RECOGIDA_NORTE,
      },
      {
        name: 'Voluntarios recogida',
        description: 'Personas para los puntos de recogida',
        quantity: 50,
        unit: 'personas',
        currentAmount: 42,
        actionId: ACTION_IDS.RECOGIDA_NORTE,
      },
      {
        name: 'Familias beneficiadas',
        description: 'Número de familias a las que llegar',
        quantity: 200,
        unit: 'familias',
        currentAmount: 0,
        actionId: ACTION_IDS.REPARTO_VALLECAS,
      },
      {
        name: 'Alumnos atendidos',
        description: 'Niños que reciben clases de refuerzo',
        quantity: 30,
        unit: 'alumnos',
        currentAmount: 28,
        actionId: ACTION_IDS.CLASES_MATES,
      },
      {
        name: 'Profesores voluntarios',
        description: 'Docentes o estudiantes universitarios',
        quantity: 10,
        unit: 'personas',
        currentAmount: 7,
        actionId: ACTION_IDS.CLASES_MATES,
      },
      {
        name: 'Viviendas limpiadas',
        description: 'Casas completamente desescombradas',
        quantity: 100,
        unit: 'viviendas',
        currentAmount: 67,
        actionId: ACTION_IDS.LIMPIEZA_PAIPORTA,
      },
      {
        name: 'Voluntarios brigadas',
        description: 'Personas para equipos de limpieza',
        quantity: 200,
        unit: 'personas',
        currentAmount: 185,
        actionId: ACTION_IDS.LIMPIEZA_PAIPORTA,
      },
    ];

    await repo.insert([...defaultObjectives, ...objectives]);
  }

  /**
   * Seed de eventos (actividades presenciales)
   */
  async seedEvents(events: EventSeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('EventEntity');

    const defaultEvents: EventSeedData[] = [
      {
        id: EVENT_IDS.EVENT_001,
        name: 'Recogida Alcobendas',
        description: 'Punto de recogida en CC La Vega',
        initialDate: new Date('2025-12-20T10:00:00Z'),
        placeDirection: 'CC La Vega, Local 45',
        placeCity: 'Alcobendas',
        placeCountryCode: 'ES',
        actionId: ACTION_IDS.RECOGIDA_NORTE,
      },
      {
        id: EVENT_IDS.EVENT_002,
        name: 'Recogida San Sebastián de los Reyes',
        description: 'Punto de recogida en Mercadona',
        initialDate: new Date('2025-12-21T09:00:00Z'),
        placeDirection: 'Av. de España, 12',
        placeCity: 'San Sebastián de los Reyes',
        placeCountryCode: 'ES',
        actionId: ACTION_IDS.RECOGIDA_NORTE,
      },
      {
        id: EVENT_IDS.EVENT_003,
        name: 'Reparto navideño Vallecas',
        description: 'Distribución de lotes en centro cívico',
        initialDate: new Date('2025-12-23T11:00:00Z'),
        placeDirection: 'Centro Cívico Puente de Vallecas',
        placeCity: 'Madrid',
        placeCountryCode: 'ES',
        actionId: ACTION_IDS.REPARTO_VALLECAS,
      },
      {
        id: EVENT_IDS.EVENT_004,
        name: 'Formación voluntarios docentes',
        description: 'Sesión de formación para nuevos profesores voluntarios',
        initialDate: new Date('2025-01-15T17:00:00Z'),
        placeDirection: 'Calle Gran Vía, 28',
        placeCity: 'Madrid',
        placeCountryCode: 'ES',
        actionId: ACTION_IDS.CLASES_MATES,
      },
      {
        id: EVENT_IDS.EVENT_005,
        name: 'Jornada de limpieza intensiva',
        description: 'Gran jornada con 100 voluntarios',
        initialDate: new Date('2025-01-10T08:00:00Z'),
        placeDirection: 'Plaza del Ayuntamiento',
        placeCity: 'Paiporta',
        placeCountryCode: 'ES',
        actionId: ACTION_IDS.LIMPIEZA_PAIPORTA,
      },
    ];

    const mappedEvents = [...defaultEvents, ...events].map(e => ({
      id: e.id,
      name: e.name,
      description: e.description,
      initialDate: e.initialDate,
      actionId: e.actionId,
      place: {
        direction: e.placeDirection,
        city: e.placeCity,
        countryCode: e.placeCountryCode,
      },
    }));

    await repo.insert(mappedEvents);
  }

  /**
   * Seed de membresías (usuarios en comunidades)
   */
  async seedCommunityMembers(): Promise<void> {
    const repo = this.dataSource.getRepository('CommunityUserEntity');

    const memberships = [
      // Miembros de "Amigos por África"
      {
        communityId: COMMUNITY_IDS.AFRICA,
        userId: USER_IDS.JUAN,
        role: MemberType.CREATOR,
        joinedAt: new Date('2024-01-15'),
      },
      {
        communityId: COMMUNITY_IDS.AFRICA,
        userId: USER_IDS.MARIA,
        role: MemberType.ADMIN,
        joinedAt: new Date('2024-03-01'),
      },
      {
        communityId: COMMUNITY_IDS.AFRICA,
        userId: USER_IDS.ANA,
        role: MemberType.MEMBER,
        joinedAt: new Date('2024-03-10'),
      },
      // Miembros de "Voluntarios Sin Fronteras Madrid"
      {
        communityId: COMMUNITY_IDS.MADRID,
        userId: USER_IDS.PEDRO,
        role: MemberType.CREATOR,
        joinedAt: new Date('2024-01-01'),
      },
      {
        communityId: COMMUNITY_IDS.MADRID,
        userId: USER_IDS.JUAN,
        role: MemberType.MEMBER,
        joinedAt: new Date('2024-04-01'),
      },
      {
        communityId: COMMUNITY_IDS.MADRID,
        userId: USER_IDS.CARLOS,
        role: MemberType.MEMBER,
        joinedAt: new Date('2024-05-15'),
      },
      // Miembros de "Ayuda Humanitaria España"
      {
        communityId: COMMUNITY_IDS.HUMANITARIA,
        userId: USER_IDS.MARIA,
        role: MemberType.CREATOR,
        joinedAt: new Date('2024-06-01'),
      },
      {
        communityId: COMMUNITY_IDS.HUMANITARIA,
        userId: USER_IDS.PEDRO,
        role: MemberType.ADMIN,
        joinedAt: new Date('2024-06-10'),
      },
    ];

    await repo.insert(memberships);
  }

  /**
   * Seed de asistentes a eventos (usuarios que asistirán a eventos)
   */
  async seedEventUsers(eventUsers: EventUserSeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('EventUserEntity');

    const defaultEventUsers: EventUserSeedData[] = [
      // Asistentes a "Recogida Alcobendas" - usuarios registrados con mobilePhone
      {
        eventId: EVENT_IDS.EVENT_001,
        userId: USER_IDS.JUAN,
        mobilePhone: '+34611111111',
        fullname: 'Juan García López',
      },
      {
        eventId: EVENT_IDS.EVENT_001,
        userId: USER_IDS.MARIA,
        mobilePhone: '+34622222222',
        fullname: 'María Rodríguez Fernández',
      },
      // Asistentes a "Recogida San Sebastián de los Reyes" - mixto
      {
        eventId: EVENT_IDS.EVENT_002,
        userId: USER_IDS.PEDRO,
        mobilePhone: '+34633333333',
        fullname: 'Pedro Martínez Sánchez',
      },
      {
        eventId: EVENT_IDS.EVENT_002,
        userId: USER_IDS.CARLOS,
        email: 'carlos@email.com', // usuario no registrado, solo email
        fullname: 'Carlos Hernández Díaz',
      },
      // Asistentes a "Reparto navideño Vallecas" - usuarios no registrados con email
      {
        eventId: EVENT_IDS.EVENT_003,
        userId: USER_IDS.ANA,
        email: 'ana.voluntaria@gmail.com',
        fullname: 'Ana González Ruiz',
      },
      {
        eventId: EVENT_IDS.EVENT_003,
        userId: USER_IDS.JUAN,
        mobilePhone: '+34611111111',
        fullname: 'Juan García López',
      },
      // Asistentes a "Formación voluntarios docentes"
      {
        eventId: EVENT_IDS.EVENT_004,
        userId: USER_IDS.MARIA,
        mobilePhone: '+34622222222',
        fullname: 'María Rodríguez Fernández',
      },
      // Asistentes a "Jornada de limpieza intensiva" - mixto
      {
        eventId: EVENT_IDS.EVENT_005,
        userId: USER_IDS.PEDRO,
        mobilePhone: '+34633333333',
        fullname: 'Pedro Martínez Sánchez',
      },
      {
        eventId: EVENT_IDS.EVENT_005,
        userId: USER_IDS.ANA,
        email: 'ana.voluntaria@gmail.com',
        fullname: 'Ana González Ruiz',
      },
      {
        eventId: EVENT_IDS.EVENT_005,
        userId: USER_IDS.CARLOS,
        email: 'carlos.voluntario@hotmail.com',
        fullname: 'Carlos Hernández Díaz',
      },
    ];

    await repo.insert([...defaultEventUsers, ...eventUsers]);
  }

  /**
   * Seed de contribuidores a objetivos (usuarios que contribuyen a objetivos)
   */
  async seedObjectiveUsers(objectiveUsers: ObjectiveUserSeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('ObjetiveUserEntity');

    const defaultObjectiveUsers: ObjectiveUserSeedData[] = [
      // Contribuidores a "Recaudación económica" del pozo Makueni - usuarios registrados
      {
        name: 'Recaudación económica',
        actionId: ACTION_IDS.POZO_MAKUENI,
        userId: USER_IDS.JUAN,
        mobilePhone: '+34611111111',
        fullname: 'Juan García López',
      },
      {
        name: 'Recaudación económica',
        actionId: ACTION_IDS.POZO_MAKUENI,
        userId: USER_IDS.MARIA,
        mobilePhone: '+34622222222',
        fullname: 'María Rodríguez Fernández',
      },
      // Contribuidores a "Voluntarios técnicos" del pozo Makueni
      {
        name: 'Voluntarios técnicos',
        actionId: ACTION_IDS.POZO_MAKUENI,
        userId: USER_IDS.PEDRO,
        mobilePhone: '+34633333333',
        fullname: 'Pedro Martínez Sánchez',
      },
      // Contribuidores a "Kilos de alimentos" recogida norte - usuario no registrado
      {
        name: 'Kilos de alimentos',
        actionId: ACTION_IDS.RECOGIDA_NORTE,
        userId: USER_IDS.ANA,
        email: 'ana.voluntaria@gmail.com',
        fullname: 'Ana González Ruiz',
      },
      // Contribuidores a "Voluntarios brigadas" limpieza Paiporta - mixto
      {
        name: 'Voluntarios brigadas',
        actionId: ACTION_IDS.LIMPIEZA_PAIPORTA,
        userId: USER_IDS.CARLOS,
        email: 'carlos.voluntario@hotmail.com',
        fullname: 'Carlos Hernández Díaz',
      },
      {
        name: 'Voluntarios brigadas',
        actionId: ACTION_IDS.LIMPIEZA_PAIPORTA,
        userId: USER_IDS.MARIA,
        mobilePhone: '+34622222222',
        fullname: 'María Rodríguez Fernández',
      },
    ];

    await repo.insert([...defaultObjectiveUsers, ...objectiveUsers]);
  }

  /**
   * Seeds request data for testing.
   * Creates requests of different types and statuses linked to seeded users.
   */
  async seedRequests(requests: RequestSeedData[] = []): Promise<void> {
    const repo = this.dataSource.getRepository('RequestEntity');
    const defaultRequests: RequestSeedData[] = [
      // Community Requests
      {
        id: REQUEST_IDS.COMMUNITY_PENDING_1,
        name: 'Comunidad Amigos del Medio Ambiente',
        description: 'Solicitud para crear una comunidad enfocada en proyectos de sostenibilidad ambiental',
        status: RequestStatus.PENDING,
        type: RequestType.COMMUNITY,
        user: { id: USER_IDS.JUAN } as UserEntity,
      },
      {
        id: REQUEST_IDS.COMMUNITY_PENDING_2,
        name: 'Comunidad Educación Rural',
        description: 'Solicitud para comunidad de apoyo educativo en zonas rurales de España',
        status: RequestStatus.PENDING,
        type: RequestType.COMMUNITY,
        user: { id: USER_IDS.MARIA } as UserEntity,
      },
      {
        id: REQUEST_IDS.COMMUNITY_APPROVED,
        name: 'Comunidad Solidaria Barcelona',
        description: 'Comunidad aprobada para voluntariado en Barcelona metropolitana',
        status: RequestStatus.APPROVED,
        type: RequestType.COMMUNITY,
        reason: 'Cumple con todos los requisitos de la plataforma',
        user: { id: USER_IDS.PEDRO } as UserEntity,
      },
      {
        id: REQUEST_IDS.COMMUNITY_REJECTED,
        name: 'Comunidad Duplicada',
        description: 'Solicitud rechazada por duplicidad con otra comunidad existente',
        status: RequestStatus.REJECTED,
        type: RequestType.COMMUNITY,
        reason: 'Ya existe una comunidad con objetivos similares en la misma zona',
        user: { id: USER_IDS.JUAN } as UserEntity,
      },
      // Cause Requests
      {
        id: REQUEST_IDS.CAUSE_PENDING_1,
        name: 'Causa Reforestación Sierra Norte',
        description: 'Solicitud de causa para plantar 10000 árboles en la Sierra Norte de Madrid',
        status: RequestStatus.PENDING,
        type: RequestType.CAUSE,
        user: { id: USER_IDS.MARIA } as UserEntity,
      },
      {
        id: REQUEST_IDS.CAUSE_PENDING_2,
        name: 'Causa Comedores Sociales',
        description: 'Solicitud para causa de apoyo a comedores sociales en Andalucía',
        status: RequestStatus.PENDING,
        type: RequestType.CAUSE,
        user: { id: USER_IDS.ANA } as UserEntity,
      },
      {
        id: REQUEST_IDS.CAUSE_APPROVED,
        name: 'Causa Refugiados Ucrania',
        description: 'Causa aprobada para ayuda humanitaria a refugiados ucranianos',
        status: RequestStatus.APPROVED,
        type: RequestType.CAUSE,
        reason: 'Causa prioritaria aprobada de urgencia',
        user: { id: USER_IDS.PEDRO } as UserEntity,
      },
      // Action Requests
      {
        id: REQUEST_IDS.ACTION_PENDING_1,
        name: 'Acción Recogida Ropa Invierno',
        description: 'Solicitud de acción para recoger ropa de invierno para personas sin hogar',
        status: RequestStatus.PENDING,
        type: RequestType.ACTION,
        user: { id: USER_IDS.CARLOS } as UserEntity,
      },
      {
        id: REQUEST_IDS.ACTION_PENDING_2,
        name: 'Acción Limpieza Playas',
        description: 'Solicitud de acción para organizar jornadas de limpieza de playas en Valencia',
        status: RequestStatus.PENDING,
        type: RequestType.ACTION,
        user: { id: USER_IDS.JUAN } as UserEntity,
      },
      {
        id: REQUEST_IDS.ACTION_APPROVED,
        name: 'Acción Donación Sangre',
        description: 'Acción aprobada para organizar maratón de donación de sangre',
        status: RequestStatus.APPROVED,
        type: RequestType.ACTION,
        reason: 'Coordinada con Cruz Roja',
        user: { id: USER_IDS.MARIA } as UserEntity,
      },
      {
        id: REQUEST_IDS.ACTION_REJECTED,
        name: 'Acción Sin Recursos',
        description: 'Acción rechazada por falta de recursos disponibles',
        status: RequestStatus.REJECTED,
        type: RequestType.ACTION,
        reason: 'No hay voluntarios suficientes en la zona indicada',
        user: { id: USER_IDS.ANA } as UserEntity,
      },
    ];

    await repo.insert([...defaultRequests, ...requests]);
  }

  // ============================================
  // UTILIDADES
  // ============================================

  async clean(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      throw new Error('DataSource is not initialized');
    }

    const tables: Array<{ tablename: string }> = await this.dataSource.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND tablename NOT IN ('migrations')
    `);

    if (tables.length === 0) {
      return;
    }

    const truncateTargets = tables.map(({ tablename }) => `"public"."${tablename}"`).join(', ');
    await this.dataSource.query(`TRUNCATE TABLE ${truncateTargets} RESTART IDENTITY CASCADE;`);
  }

  /**
   * Seed completo para Users App
   */
  async seedAll(): Promise<void> {
    await this.clean();
    await this.seedUsers();
    await this.seedCommunityUsers();
  }

  /**
   * Seed completo para Communities App
   * Orden importante por dependencias FK
   */
  async seedAllCommunities(): Promise<void> {
    await this.clean();

    // 1. Primero usuarios (sin dependencias)
    await this.seedCommunityUsers();

    // 2. Comunidades (sin dependencias)
    await this.seedCommunities();

    // 3. Membresías (depende de users + communities)
    await this.seedCommunityMembers();

    // 4. Causas (depende de communities)
    await this.seedCauses();

    // 5. Acciones (depende de causes)
    await this.seedActions();

    // 6. Objetivos (depende de actions)
    await this.seedObjectives();

    // 7. Eventos (depende de actions)
    await this.seedEvents();

    // 8. Asistentes a eventos (depende de events + users)
    await this.seedEventUsers();

    // 9. Contribuidores a objetivos (depende de objectives + users)
    await this.seedObjectiveUsers();
  }
}

export {
  ACTION_IDS as PG_ACTION_IDS,
  CAUSE_IDS as PG_CAUSE_IDS,
  COMMUNITY_IDS as PG_COMMUNITY_IDS,
  EVENT_IDS as PG_EVENT_IDS,
  OBJECTIVE_IDS as PG_OBJECTIVE_IDS,
  REQUEST_IDS as PG_REQUEST_IDS,
  USER_IDS as PG_USER_IDS,
};
