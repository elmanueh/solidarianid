# Patrón Repository - Documentación de Implementación

Esta documentación detalla la implementación del patrón Repository siguiendo los principios de **Clean Architecture** y **Domain-Driven Design (DDD)** en el proyecto SolidarianID.

---

## Arquitectura General

El patrón Repository implementado sigue una arquitectura hexagonal donde:

- **Dominio** no tiene dependencias de infraestructura
- **Puertos** (interfaces abstractas) definen contratos
- **Adaptadores** (implementaciones concretas) satisfacen los contratos
- **Mappers** traducen entre modelos de dominio y entidades de persistencia

## Estructura de Capas

```
solidarian-id/
├── apps/
│   └── communities/
│       └── src/
│           ├── communities.module.ts                       # Configuración e inyección de dependencias
│           ├── communities.controller.ts                   # Capa de presentación (REST API)
│           ├── communities.service.ts                      # Capa de aplicación (casos de uso)
│           ├── domain/
│           │   ├── community.ts                            # Modelo de dominio
│           │   └── interfaces/
│           │       └── communities.repository.ts           # Puerto específico para Community
│           └── infrastructure/
│               └── persistence/
│                   ├── communities.repository-typeorm.ts    # Adaptador TypeORM para Community
│                   ├── community.mapper.ts                  # Mapper específico Community ↔ CommunityEntity
│                   └── entities/
│                       └── community.entity.ts              # Entidad de persistencia (TypeORM)
└── libs/
    └── ddd/
        └── src/
            └── repository/
                ├── repository.ts                  # Contrato base abstracto (Puerto)
                ├── repository-typeorm.ts          # Implementación base TypeORM reutilizable
                ├── mapper.ts                      # Interfaz base Mapper
                │
                └── exceptions/
                    ├── repository.exception.ts        # Error de infraestructura/persistencia
                    └── entity-not-found.exception.ts  # Error cuando no se encuentra entidad
```

---

## Implementación Paso a Paso

### Paso 1: Crear el Modelo de Dominio

El modelo de dominio representa la lógica de negocio sin dependencias de infraestructura.

```typescript
import { Entity } from "@app/ddd/entity";
import { UniqueEntityID } from "@app/value-objects/model/unique-entity-id";

interface CommunityProps {
  name: string;
}

export class Community extends Entity<CommunityProps> {
  private constructor(props: CommunityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  static create(props: CommunityProps, id?: UniqueEntityID): Community {
    return new Community(props, id);
  }
}
```

---

### Paso 2: Crear la Entidad de Persistencia

Entidad TypeORM que mapea directamente a la tabla de base de datos.

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommunityEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
}
```

---

### Paso 3: Crear el Mapper

Traduce entre el modelo de dominio rico y la entidad plana de persistencia.

```typescript
import { Either, left, right } from "@app/ddd/either";
import { Mapper } from "@app/ddd/repository/mapper/mapper";
import { InvalidUniqueEntityIDError } from "@app/value-objects/errors/validation/unique-entity-id-validation-error";
import { UniqueEntityID } from "@app/value-objects/model/unique-entity-id";
import { Injectable } from "@nestjs/common";
import { Community } from "apps/communities/src/causes/models/community";
import { CommunityEntity } from "apps/communities/src/causes/models/community.entity";

@Injectable()
export class CommunityMapper implements Mapper<Community, CommunityEntity> {
  toPersistence(model: Community) {
    const entity = new CommunityEntity();
    entity.id = model.id.value;
    entity.name = model.name;

    return entity;
  }

  fromPersistence(entity: CommunityEntity): Either<InvalidUniqueEntityIDError, Community> {
    const id = UniqueEntityID.create(entity.id);
    if (id.isLeft()) {
      return left(id.value);
    }

    const model = Community.create(
      {
        name: entity.name,
      },
      id.value
    );

    return right(model);
  }
}
```

---

### Paso 4: Crear el Contrato del Repositorio

Define las operaciones específicas para Community.

```typescript
import { Either } from "@app/ddd/either";
import { RepositoryException } from "@app/ddd/repository/exceptions/repository.exception";
import { Repository } from "@app/ddd/repository/repository";
import { Community } from "apps/communities/src/causes/models/community";

/**
 * Repository contract for Community entities.
 */
export abstract class CommunitiesRepository extends Repository<Community> {
  /**
   * Retrieves all communities matching the given name.
   *
   * @param name Community name
   */
  abstract getAllCommunitiesByName(name: string): Promise<Either<RepositoryException, Community[]>>;
}
```

---

### Paso 5: Implementar el Adaptador TypeORM

Implementación concreta del repositorio usando TypeORM.

```typescript
import { Either, left, right } from "@app/ddd/either";
import { CommunityMapper } from "@app/ddd/repository/mapper/community.mapper";
import { CommunitiesRepository } from "@app/ddd/repository/communities.repository";
import { RepositoryException } from "@app/ddd/repository/exceptions/repository.exception";
import { Repository as TypeOrmRepository } from "typeorm";
import { Community } from "apps/communities/src/causes/models/community";
import { CommunityEntity } from "apps/communities/src/causes/models/community.entity";
import { RepositoryTypeORM } from "@app/ddd/repository/repository-typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CommunitiesRepositoryTypeORM
  extends RepositoryTypeORM<Community, CommunityEntity>
  implements CommunitiesRepository
{
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: TypeOrmRepository<CommunityEntity>,
    private readonly communityMapper: CommunityMapper
  ) {
    super(communityRepository, communityMapper);
  }

  async getAllCommunitiesByName(name: string): Promise<Either<RepositoryException, Community[]>> {
    const communities = await this.communityRepository.findBy({ name });

    const filtered = communities.map((e) => this.communityMapper.fromPersistence(e));

    if (filtered.some((c) => c.isLeft())) {
      const firstError = filtered.find((c) => c.isLeft())!;
      return left(firstError.value);
    }

    return right(filtered.map((c) => c.value as Community));
  }
}
```

---

### Paso 6: Crear el Servicio de Aplicación

Orquesta los casos de uso usando el repositorio.

```typescript
import { CommunitiesRepository } from "@app/ddd/repository/communities.repository";
import { Injectable } from "@nestjs/common";
import { Community } from "apps/communities/src/causes/models/community";

@Injectable()
export class CommunitiesService {
  constructor(private readonly communityRepository: CommunitiesRepository) {}

  async createCommunity(name: string): Promise<void> {
    const model = Community.create({ name });
    const result = await this.communityRepository.save(model);
    if (result.isLeft()) {
      throw result.value;
    }
  }

  async findCommunity(id: string): Promise<Community> {
    const model = await this.communityRepository.findById(id);
    if (model.isLeft()) {
      throw model.value;
    }
    return model.value;
  }

  async findCommunitiesByName(name: string): Promise<Community[]> {
    const result = await this.communityRepository.getAllCommunitiesByName(name);
    if (result.isLeft()) {
      throw result.value;
    }
    return result.value;
  }

  async removeCommunity(id: string): Promise<void> {
    await this.communityRepository.remove(id);
  }
}
```

---

### Paso 7: Crear el Controlador

Expone endpoints REST para las operaciones.

```typescript
import { Controller, Get, Param, Post } from "@nestjs/common";
import { CommunitiesService } from "./communities.service";

@Controller("communities")
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  async createSampleCommunity() {
    await this.communitiesService.createCommunity("prueba");
  }

  @Get(":id")
  async getCommunity(@Param("id") id: string) {
    return this.communitiesService.findCommunity(id);
  }

  @Get("name/:name")
  async getCommunityByName(@Param("name") name: string) {
    return this.communitiesService.findCommunitiesByName(name);
  }
}
```

---

### Paso 8: Configurar el Módulo

Configura TypeORM y la inyección de dependencias.

```typescript
import { Module } from "@nestjs/common";
import { CommunitiesController } from "./communities.controller";
import { CommunitiesService } from "./communities.service";
import { CommunitiesRepository } from "@app/ddd/repository/communities.repository";
import { CommunitiesRepositoryTypeORM } from "@app/ddd/repository/communities.repository-typeorm";
import { CommunityMapper } from "@app/ddd/repository/mapper/community.mapper";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommunityEntity } from "apps/communities/src/causes/models/community.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "test",
      password: "test",
      database: "solidarianid",
      entities: [CommunityEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CommunityEntity]),
  ],
  controllers: [CommunitiesController],
  providers: [
    CommunitiesService,
    CommunityMapper,
    {
      provide: CommunitiesRepository,
      useClass: CommunitiesRepositoryTypeORM,
    },
  ],
})
export class CommunitiesModule {}
```
