import { PostgreSQLTestModule, PostgreSQLSeeder, PostgreSQLTestContainer, USER_IDS } from '@solidarianid/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource, Repository as TypeOrmRepository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityEntity } from '../../src/infrastructure/persistence/entities/community.entity';
import { CauseEntity } from '../../src/infrastructure/persistence/entities/cause.entity';
import { ActionEntity } from '../../src/infrastructure/persistence/entities/action.entity';
import { UserEntity } from '../../src/infrastructure/persistence/entities/user.entity';
import { ObjectiveEntity } from '../../src/infrastructure/persistence/entities/objective.entity';
import { EventEntity } from '../../src/infrastructure/persistence/entities/event.entity';
import { CommunityUserEntity } from '../../src/infrastructure/persistence/entities/community-user.entity';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { Request } from '@app/communities/domain/model/entities/request';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestsRepositoryTypeOrmAdapter } from '@app/communities/infrastructure/persistence/repositories/requests-typeorm.repository';
import { RequestEntityMapper } from '@app/communities/infrastructure/persistence/mappers/request-entity.mapper';
import { UserEntityMapper } from '@app/communities/infrastructure/persistence/mappers/user-entity.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';

// ============================================
// TEST DATA - Request IDs (Valid UUID format)
// ============================================
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

describe('RequestsRepositoryTypeOrmAdapter (e2e)', () => {
  let app: INestApplication;
  let seeder: PostgreSQLSeeder;
  let requestsRepository: RequestsRepositoryPort;
  let requestEntityRepository: TypeOrmRepository<RequestEntity>;

  beforeAll(async () => {
    const databaseModule = await PostgreSQLTestModule.forRoot([
      CommunityEntity,
      CauseEntity,
      ActionEntity,
      UserEntity,
      ObjectiveEntity,
      EventEntity,
      CommunityUserEntity,
      RequestEntity,
    ]);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [databaseModule, TypeOrmModule.forFeature([RequestEntity])],
      providers: [
        UserEntityMapper,
        RequestEntityMapper,
        {
          provide: RequestsRepositoryPort,
          useClass: RequestsRepositoryTypeOrmAdapter,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get<DataSource>('DataSource');
    seeder = new PostgreSQLSeeder(dataSource);
    requestsRepository = app.get(RequestsRepositoryPort);
    requestEntityRepository = app.get(getRepositoryToken(RequestEntity));
  });

  afterAll(async () => {
    if (app) await app.close();
    await PostgreSQLTestContainer.getInstance().stop();
  });

  /**
   * Seeds request data for testing.
   * Creates requests of different types and statuses linked to seeded users.
   */
  async function seedRequests(): Promise<void> {
    const requests: Partial<RequestEntity>[] = [
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

    await requestEntityRepository.save(requests);
  }

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedCommunityUsers();
    await seedRequests();
  });

  // ============================================
  // findByIdAndType
  // ============================================
  describe('findByIdAndType', () => {
    describe('Community Requests', () => {
      it('should find a community request by id and type', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.COMMUNITY_PENDING_1, RequestType.COMMUNITY);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          const request = result.value;
          expect(request).toBeInstanceOf(Request);
          expect(request.type).toBe(RequestType.COMMUNITY);
          expect(request.name).toBe('Comunidad Amigos del Medio Ambiente');
          expect(request.status).toBe(RequestStatus.PENDING);
          expect(request.user).toBeDefined();
          expect(request.user.id.value).toBe(USER_IDS.JUAN);
        }
      });

      it('should return EntityNotFoundException when community request does not exist', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.NON_EXISTENT, RequestType.COMMUNITY);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value.message).toContain('Request');
          expect(result.value.message).toContain(REQUEST_IDS.NON_EXISTENT);
        }
      });

      it('should return error when request exists but is not of type COMMUNITY', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.CAUSE_PENDING_1, RequestType.COMMUNITY);

        expect(result.isLeft()).toBe(true);
      });
    });

    describe('Cause Requests', () => {
      it('should find a cause request by id and type', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.CAUSE_PENDING_1, RequestType.CAUSE);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          const request = result.value;
          expect(request).toBeInstanceOf(Request);
          expect(request.type).toBe(RequestType.CAUSE);
          expect(request.name).toBe('Causa Reforestación Sierra Norte');
          expect(request.status).toBe(RequestStatus.PENDING);
          expect(request.user.id.value).toBe(USER_IDS.MARIA);
        }
      });

      it('should return EntityNotFoundException when cause request does not exist', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.NON_EXISTENT, RequestType.CAUSE);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value.message).toContain('Request');
        }
      });

      it('should return error when request exists but is not of type CAUSE', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.ACTION_PENDING_1, RequestType.CAUSE);

        expect(result.isLeft()).toBe(true);
      });
    });

    describe('Action Requests', () => {
      it('should find an action request by id and type', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.ACTION_PENDING_1, RequestType.ACTION);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
          const request = result.value;
          expect(request).toBeInstanceOf(Request);
          expect(request.type).toBe(RequestType.ACTION);
          expect(request.name).toBe('Acción Recogida Ropa Invierno');
          expect(request.status).toBe(RequestStatus.PENDING);
          expect(request.user.id.value).toBe(USER_IDS.CARLOS);
        }
      });

      it('should return EntityNotFoundException when action request does not exist', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.NON_EXISTENT, RequestType.ACTION);

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
          expect(result.value.message).toContain('Request');
        }
      });

      it('should return error when request exists but is not of type ACTION', async () => {
        const result = await requestsRepository.findByIdAndType(REQUEST_IDS.COMMUNITY_PENDING_1, RequestType.ACTION);

        expect(result.isLeft()).toBe(true);
      });
    });
  });

  // ============================================
  // findByType
  // ============================================
  describe('findByType', () => {
    it('should find all community requests', async () => {
      const result = await requestsRepository.findByType(RequestType.COMMUNITY);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(4);
        requests.forEach(request => {
          expect(request).toBeInstanceOf(Request);
          expect(request.type).toBe(RequestType.COMMUNITY);
        });
      }
    });

    it('should find all cause requests', async () => {
      const result = await requestsRepository.findByType(RequestType.CAUSE);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(3);
        requests.forEach(request => {
          expect(request).toBeInstanceOf(Request);
          expect(request.type).toBe(RequestType.CAUSE);
        });
      }
    });

    it('should find all action requests', async () => {
      const result = await requestsRepository.findByType(RequestType.ACTION);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(4);
        requests.forEach(request => {
          expect(request).toBeInstanceOf(Request);
          expect(request.type).toBe(RequestType.ACTION);
        });
      }
    });

    it('should return empty array when no requests of type exist', async () => {
      await seeder.clean();
      await seeder.seedCommunityUsers();

      const result = await requestsRepository.findByType(RequestType.COMMUNITY);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual([]);
      }
    });
  });

  // ============================================
  // findPendingRequestsByType
  // ============================================
  describe('findPendingRequestsByType', () => {
    it('should find all pending community requests', async () => {
      const result = await requestsRepository.findPendingRequestsByType(RequestType.COMMUNITY);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(2);
        requests.forEach(request => {
          expect(request.status).toBe(RequestStatus.PENDING);
        });
      }
    });

    it('should find all pending cause requests', async () => {
      const result = await requestsRepository.findPendingRequestsByType(RequestType.CAUSE);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(2);
        requests.forEach(request => {
          expect(request.status).toBe(RequestStatus.PENDING);
        });
      }
    });

    it('should find all pending action requests', async () => {
      const result = await requestsRepository.findPendingRequestsByType(RequestType.ACTION);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(2);
        requests.forEach(request => {
          expect(request.status).toBe(RequestStatus.PENDING);
        });
      }
    });

    it('should not include approved or rejected requests', async () => {
      const result = await requestsRepository.findPendingRequestsByType(RequestType.COMMUNITY);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        const hasNonPending = requests.some(
          r => r.status === RequestStatus.APPROVED || r.status === RequestStatus.REJECTED,
        );
        expect(hasNonPending).toBe(false);
      }
    });
  });

  // ============================================
  // findByUserId
  // ============================================
  describe('findByUserId', () => {
    it('should find all requests by user JUAN (3 requests)', async () => {
      const result = await requestsRepository.findByUserId(USER_IDS.JUAN);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(3);
        requests.forEach(request => {
          expect(request.user.id.value).toBe(USER_IDS.JUAN);
        });
      }
    });

    it('should find all requests by user MARIA (3 requests)', async () => {
      const result = await requestsRepository.findByUserId(USER_IDS.MARIA);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(3);
      }
    });

    it('should find all requests by user ANA (2 requests)', async () => {
      const result = await requestsRepository.findByUserId(USER_IDS.ANA);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(2);
      }
    });

    it('should return empty array when user has no requests', async () => {
      // CARLOS only has 1 request (ACTION_PENDING_1)
      await seeder.clean();
      await seeder.seedCommunityUsers();
      // No seed requests - user has no requests

      const result = await requestsRepository.findByUserId(USER_IDS.CARLOS);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual([]);
      }
    });

    it('should return empty array for non-existent user', async () => {
      const result = await requestsRepository.findByUserId(REQUEST_IDS.NON_EXISTENT);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual([]);
      }
    });
  });

  // ============================================
  // findByUserIdAndType
  // ============================================
  describe('findByUserIdAndType', () => {
    it('should find community requests by user JUAN', async () => {
      const result = await requestsRepository.findByUserIdAndType(USER_IDS.JUAN, RequestType.COMMUNITY);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(2); // COMMUNITY_PENDING_1 and COMMUNITY_REJECTED
        requests.forEach(request => {
          expect(request.user.id.value).toBe(USER_IDS.JUAN);
        });
      }
    });

    it('should find action requests by user JUAN', async () => {
      const result = await requestsRepository.findByUserIdAndType(USER_IDS.JUAN, RequestType.ACTION);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(1); // ACTION_PENDING_2
      }
    });

    it('should find cause requests by user MARIA', async () => {
      const result = await requestsRepository.findByUserIdAndType(USER_IDS.MARIA, RequestType.CAUSE);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        const requests = result.value;
        expect(requests.length).toBe(1); // CAUSE_PENDING_1
      }
    });

    it('should return empty array when user has no requests of specified type', async () => {
      const result = await requestsRepository.findByUserIdAndType(USER_IDS.CARLOS, RequestType.COMMUNITY);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual([]);
      }
    });

    it('should return empty array for non-existent user', async () => {
      const result = await requestsRepository.findByUserIdAndType(REQUEST_IDS.NON_EXISTENT, RequestType.COMMUNITY);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toEqual([]);
      }
    });
  });

  // ============================================
  // Base Repository Operations (inherited from RepositoryTypeORM)
  // ============================================
  describe('Base Repository Operations', () => {
    it('should find a request by id using base findById', async () => {
      const result = await requestsRepository.findById(REQUEST_IDS.COMMUNITY_PENDING_1);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value.name).toBe('Comunidad Amigos del Medio Ambiente');
      }
    });

    it('should return error for non-existent id using base findById', async () => {
      const result = await requestsRepository.findById(REQUEST_IDS.NON_EXISTENT);

      expect(result.isLeft()).toBe(true);
    });
  });
});
