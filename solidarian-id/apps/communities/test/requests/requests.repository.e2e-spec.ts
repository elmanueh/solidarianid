import { PostgreSQLTestModule, PostgreSQLSeeder, PostgreSQLTestContainer, USER_IDS } from '@solidarianid/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityEntity } from '../../src/infrastructure/persistence/entities/community.entity';
import { CauseEntity } from '../../src/infrastructure/persistence/entities/cause.entity';
import { ActionEntity } from '../../src/infrastructure/persistence/entities/action.entity';
import { UserEntity } from '../../src/infrastructure/persistence/entities/user.entity';
import { ObjectiveEntity } from '../../src/infrastructure/persistence/entities/objective.entity';
import { EventEntity } from '../../src/infrastructure/persistence/entities/event.entity';
import { EventUserEntity } from '../../src/infrastructure/persistence/entities/event-user';
import { ObjetiveUserEntity } from '../../src/infrastructure/persistence/entities/objetive-user';
import { CommunityUserEntity } from '../../src/infrastructure/persistence/entities/community-user.entity';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { Request } from '@app/communities/domain/model/entities/request';
import { RequestsRepositoryTypeOrmAdapter } from '@app/communities/infrastructure/persistence/repositories/requests-typeorm.repository';
import { RequestEntityMapper } from '@app/communities/infrastructure/persistence/mappers/request-entity.mapper';
import { UserEntityMapper } from '@app/communities/infrastructure/persistence/mappers/user-entity.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { REQUEST_IDS } from '@solidarianid/testing';
// ============================================
// TEST DATA - Request IDs (Valid UUID format)
// ============================================

describe('RequestsRepositoryTypeOrmAdapter (e2e)', () => {
  let app: INestApplication;
  let seeder: PostgreSQLSeeder;
  let requestsRepository: RequestsRepositoryPort;

  beforeAll(async () => {
    const databaseModule = await PostgreSQLTestModule.forRoot([
      CommunityEntity,
      CauseEntity,
      ActionEntity,
      UserEntity,
      ObjectiveEntity,
      EventEntity,
      EventUserEntity,
      ObjetiveUserEntity,
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
  });

  afterAll(async () => {
    if (app) await app.close();
    await PostgreSQLTestContainer.getInstance().stop();
  });

  beforeEach(async () => {
    await seeder.clean();
    await seeder.seedCommunityUsers();
    await seeder.seedRequests();
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
    describe('METAMORPHIC TESTING E2E', () => {
      describe('subset relation: each type filter returns a subset of all requests', () => {
        it('should return community requests as a subset of all requests', async () => {
          const communityResult = await requestsRepository.findByType(RequestType.COMMUNITY);
          const allRequestResult = await requestsRepository.findAll();

          expect(communityResult.isRight()).toBe(true);
          expect(allRequestResult.isRight()).toBe(true);

          if (communityResult.isRight() && allRequestResult.isRight()) {
            const communityIds = new Set(communityResult.value.map(r => r.id.value));
            const allIds = new Set(allRequestResult.value.map(r => r.id.value));

            // Community ⊆ All
            [...communityIds].forEach(id => {
              expect(allIds.has(id)).toBe(true);
            });
          }
        });

        it('should return cause requests as a subset of all requests', async () => {
          const causeResult = await requestsRepository.findByType(RequestType.CAUSE);
          const allRequestResult = await requestsRepository.findAll();

          expect(causeResult.isRight()).toBe(true);
          expect(allRequestResult.isRight()).toBe(true);

          if (causeResult.isRight() && allRequestResult.isRight()) {
            const causeIds = new Set(causeResult.value.map(r => r.id.value));
            const allIds = new Set(allRequestResult.value.map(r => r.id.value));

            // Cause ⊆ All
            [...causeIds].forEach(id => {
              expect(allIds.has(id)).toBe(true);
            });
          }
        });

        it('should return action requests as a subset of all requests', async () => {
          const actionResult = await requestsRepository.findByType(RequestType.ACTION);
          const allRequestResult = await requestsRepository.findAll();

          expect(actionResult.isRight()).toBe(true);
          expect(allRequestResult.isRight()).toBe(true);

          if (actionResult.isRight() && allRequestResult.isRight()) {
            const actionIds = new Set(actionResult.value.map(r => r.id.value));
            const allIds = new Set(allRequestResult.value.map(r => r.id.value));

            // Action ⊆ All
            [...actionIds].forEach(id => {
              expect(allIds.has(id)).toBe(true);
            });
          }
        });
      });

      describe('pairwise disjoint sets: cartesian product verification', () => {
        it('should return disjoint sets for community and cause, with their union being a subset of all', async () => {
          const communityResult = await requestsRepository.findByType(RequestType.COMMUNITY);
          const causeResult = await requestsRepository.findByType(RequestType.CAUSE);
          const allRequestResult = await requestsRepository.findAll();

          expect(communityResult.isRight()).toBe(true);
          expect(causeResult.isRight()).toBe(true);
          expect(allRequestResult.isRight()).toBe(true);

          if (communityResult.isRight() && causeResult.isRight() && allRequestResult.isRight()) {
            const communityIds = new Set(communityResult.value.map(r => r.id.value));
            const causeIds = new Set(causeResult.value.map(r => r.id.value));
            const allIds = new Set(allRequestResult.value.map(r => r.id.value));

            // Community ∩ Cause = ∅
            const intersection = [...communityIds].filter(id => causeIds.has(id));
            expect(intersection).toEqual([]);

            // Community ∪ Cause ⊆ All
            const union = new Set([...communityIds, ...causeIds]);
            [...union].forEach(id => {
              expect(allIds.has(id)).toBe(true);
            });
          }
        });

        it('should return disjoint sets for community and action, with their union being a subset of all', async () => {
          const communityResult = await requestsRepository.findByType(RequestType.COMMUNITY);
          const actionResult = await requestsRepository.findByType(RequestType.ACTION);
          const allRequestResult = await requestsRepository.findAll();

          expect(communityResult.isRight()).toBe(true);
          expect(actionResult.isRight()).toBe(true);
          expect(allRequestResult.isRight()).toBe(true);

          if (communityResult.isRight() && actionResult.isRight() && allRequestResult.isRight()) {
            const communityIds = new Set(communityResult.value.map(r => r.id.value));
            const actionIds = new Set(actionResult.value.map(r => r.id.value));
            const allIds = new Set(allRequestResult.value.map(r => r.id.value));

            // Community ∩ Action = ∅
            const intersection = [...communityIds].filter(id => actionIds.has(id));
            expect(intersection).toEqual([]);

            // Community ∪ Action ⊆ All
            const union = new Set([...communityIds, ...actionIds]);
            [...union].forEach(id => {
              expect(allIds.has(id)).toBe(true);
            });
          }
        });

        it('should return disjoint sets for cause and action, with their union being a subset of all', async () => {
          const causeResult = await requestsRepository.findByType(RequestType.CAUSE);
          const actionResult = await requestsRepository.findByType(RequestType.ACTION);
          const allRequestResult = await requestsRepository.findAll();

          expect(causeResult.isRight()).toBe(true);
          expect(actionResult.isRight()).toBe(true);
          expect(allRequestResult.isRight()).toBe(true);

          if (causeResult.isRight() && actionResult.isRight() && allRequestResult.isRight()) {
            const causeIds = new Set(causeResult.value.map(r => r.id.value));
            const actionIds = new Set(actionResult.value.map(r => r.id.value));
            const allIds = new Set(allRequestResult.value.map(r => r.id.value));

            // Cause ∩ Action = ∅
            const intersection = [...causeIds].filter(id => actionIds.has(id));
            expect(intersection).toEqual([]);

            // Cause ∪ Action ⊆ All
            const union = new Set([...causeIds, ...actionIds]);
            [...union].forEach(id => {
              expect(allIds.has(id)).toBe(true);
            });
          }
        });
      });

      describe('complete partition: three disjoint sets whose union equals all requests', () => {
        it('should return three disjoint sets when filtering by different request types (communities, causes and actions)', async () => {
          // Arrange & Act: Obtener solicitudes por cada tipo
          const communityResult = await requestsRepository.findByType(RequestType.COMMUNITY);
          const causeResult = await requestsRepository.findByType(RequestType.CAUSE);
          const actionResult = await requestsRepository.findByType(RequestType.ACTION);
          const allRequestResult = await requestsRepository.findAll();

          // Assert: Verificar que todas las consultas fueron exitosas
          expect(communityResult.isRight()).toBe(true);
          expect(causeResult.isRight()).toBe(true);
          expect(actionResult.isRight()).toBe(true);
          expect(allRequestResult.isRight()).toBe(true);

          if (
            communityResult.isRight() &&
            causeResult.isRight() &&
            actionResult.isRight() &&
            allRequestResult.isRight()
          ) {
            const communityRequests = communityResult.value;
            const causeRequests = causeResult.value;
            const actionRequests = actionResult.value;
            const allRequests = allRequestResult.value;

            // Extraer los IDs de cada conjunto
            const communityIds = new Set(communityRequests.map(r => r.id.value));
            const causeIds = new Set(causeRequests.map(r => r.id.value));
            const actionIds = new Set(actionRequests.map(r => r.id.value));
            const allResultIds = new Set(allRequests.map(r => r.id.value));

            const unionOfThree = new Set([...communityIds, ...causeIds, ...actionIds]);
            const communityIntersectCause = [...communityIds].filter(id => causeIds.has(id));
            const communityIntersectAction = [...communityIds].filter(id => actionIds.has(id));
            const causeIntersectAction = [...causeIds].filter(id => actionIds.has(id));
            const totalRequests = communityRequests.length + causeRequests.length + actionRequests.length;

            // Verificar que la unión de los tres conjuntos es igual al conjunto de todas las solicitudes
            // Mismo tamaño
            expect(unionOfThree.size).toBe(allResultIds.size);
            // Todos los elementos de la unión están en allResultIds
            [...unionOfThree].forEach(id => {
              expect(allResultIds.has(id)).toBe(true);
            });
            // Todos los elementos de allResultIds están en la unión
            [...allResultIds].forEach(id => {
              expect(unionOfThree.has(id)).toBe(true);
            });
            // Verificar que los conjuntos son disjuntos (no comparten elementos)
            // Community ∩ Cause = ∅
            expect(communityIntersectCause).toEqual([]);
            // Community ∩ Action = ∅
            expect(communityIntersectAction).toEqual([]);
            // Cause ∩ Action = ∅
            expect(causeIntersectAction).toEqual([]);

            // Verificar que la unión de los tres conjuntos contiene todas las solicitudes
            expect(allResultIds.size).toBe(totalRequests);
          }
        });
      });
    });

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
