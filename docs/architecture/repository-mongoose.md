# Patrón Repository con Mongoose - Documentación de Implementación

Esta documentación detalla la implementación del patrón Repository con **Mongoose** siguiendo los principios de **Clean Architecture** y **Domain-Driven Design (DDD)** en el proyecto SolidarianID.

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
│   └── users/
│       └── src/
│           ├── app.module.ts                                    # Módulo raíz con configuración MongoDB
│           ├── user.module.ts                                   # Configuración e inyección de dependencias
│           ├── domain/
│           │   ├── model/
│           │   │   └── user.ts                                  # Modelo de dominio
│           │   ├── ports/
│           │   │   ├── in/
│           │   │   │   └── users.service.port.ts               # Puerto de entrada (use case)
│           │   │   └── out/
│           │   │       └── user.repository.ts                  # Puerto específico para User
│           │   └── errors/
│           │       └── invalid-user-error.ts                   # Errores de dominio
│           ├── application/
│           │   └── services/
│           │       └── users.service.ts                        # Capa de aplicación (casos de uso)
│           └── infrastructure/
│               ├── persistence/
│               │   ├── user.repository-mongoose.ts             # Adaptador Mongoose para User
│               │   ├── user.mapper.ts                          # Mapper específico User ↔ UserEntity
│               │   └── entities/
│               │       └── user.entity.ts                      # Esquema de persistencia (Mongoose)
│               └── presentation/
│                   └── controllers/
│                       └── users.controller.ts                 # Capa de presentación (REST API)
└── libs/
    └── ddd/
        └── src/
            └── repository/
                ├── repository.ts                  # Contrato base abstracto (Puerto)
                ├── repository-mongoose.ts         # Implementación base Mongoose reutilizable
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
import { Either, right } from "@app/ddd/either";
import { UniqueEntityID } from "@app/value-objects/model/unique-entity-id";
import { Username } from "@app/value-objects/model/username";
import { InvalidUserError } from "../errors/invalid-user-error";

export interface UserProps {
  username: Username;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get username(): Username {
    return this.props.username;
  }

  public static create(props: UserProps, id?: UniqueEntityID): Either<InvalidUserError, User> {
    return right(new User(props, id));
  }
}
```

---

### Paso 2: Crear el Esquema de Persistencia

Esquema Mongoose que mapea directamente a la colección de MongoDB.

```typescript
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
  @Prop()
  _id: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
```

---

### Paso 3: Crear el Mapper

Traduce entre el modelo de dominio rico y el esquema plano de persistencia.

**Archivo:** `apps/users/src/infrastructure/persistence/user.mapper.ts`

```typescript
import { Either, left, right } from "@app/ddd/either";
import { Mapper } from "@app/ddd/repository/mapper";
import { User } from "@app/users/domain/model/user";
import { UserEntity } from "@app/users/infrastructure/persistence/entities/user.entity";
import { InvalidUniqueEntityIDError } from "@app/value-objects/errors/validation/unique-entity-id-validation-error";
import { UniqueEntityID } from "@app/value-objects/model/unique-entity-id";
import { Username } from "@app/value-objects/model/username";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMapper extends Mapper<User, UserEntity> {
  toPersistence(model: User): UserEntity {
    const entity = new UserEntity();
    entity._id = model.id.value;
    entity.name = model.username.value;
    return entity;
  }

  fromPersistence(entity: UserEntity): Either<InvalidUniqueEntityIDError, User> {
    const username = Username.create(entity.name);
    if (username.isLeft()) {
      return left(username.value);
    }

    const id = UniqueEntityID.create(entity._id);
    if (id.isLeft()) {
      return left(id.value);
    }

    const model = User.create(
      {
        username: username.value,
      },
      id.value
    );

    if (model.isLeft()) {
      return left(model.value);
    }

    return right(model.value);
  }
}
```

---

### Paso 4: Crear el Contrato del Repositorio

Define las operaciones específicas para User.

```typescript
import { Either } from "@app/ddd/either";
import { RepositoryException } from "@app/ddd/repository/exceptions/repository.exception";
import { Repository } from "@app/ddd/repository/repository";
import { User } from "@app/users/domain/model/user";

/**
 * Repository contract for User entities.
 */
export abstract class UserRepository extends Repository<User> {
  /**
   * Retrieves all users matching the given name.
   *
   * @param name Community name
   */
  abstract getAllUsersByName(name: string): Promise<Either<RepositoryException, User[]>>;
}
```

---

### Paso 5: Implementar el Adaptador Mongoose

Implementación concreta del repositorio usando Mongoose.

**Archivo:** `apps/users/src/infrastructure/persistence/user.repository-mongoose.ts`

```typescript
import { Either, left, right } from "@app/ddd/either";
import { RepositoryException } from "@app/ddd/repository/exceptions/repository.exception";
import { RepositoryMongoose } from "@app/ddd/repository/repository-mongoose";
import { User } from "@app/users/domain/model/user";
import { UserDocument, UserEntity } from "@app/users/infrastructure/persistence/entities/user.entity";
import { UserMapper } from "@app/users/infrastructure/persistence/user.mapper";
import { UserRepository } from "@app/users/domain/ports/out/user.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRepositoryMongoose extends RepositoryMongoose<User, UserEntity> implements UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userMapper: UserMapper
  ) {
    super(userModel, userMapper);
  }

  async getAllUsersByName(name: string): Promise<Either<RepositoryException, User[]>> {
    const users = await this.userModel.find({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    const filtered = users.map((e) => this.userMapper.fromPersistence(e));

    if (filtered.some((c) => c.isLeft())) {
      const firstError = filtered.find((c) => c.isLeft())!;
      return left(firstError.value);
    }

    return right(filtered.map((c) => c.value as User));
  }
}
```

---

### Paso 6: Crear el Servicio de Aplicación

Orquesta los casos de uso usando el repositorio.

```typescript
import { Injectable, BadRequestException } from "@nestjs/common";
import { UserServicePort, RegisterUserCommand } from "@app/users/domain/ports/in/users.service.port";
import { User } from "@app/users/domain/model/user";
import { Username } from "@app/value-objects/model/username";
import { UserRepository } from "@app/users/domain/ports/out/user.repository";

@Injectable()
export class UsersService extends UserServicePort {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async registerUser(command: RegisterUserCommand): Promise<string> {
    const usernameResult = Username.create(command.username);

    if (usernameResult.isLeft()) {
      throw new BadRequestException("Invalid username");
    }

    const userResult = User.create({
      username: usernameResult.value,
    });

    if (userResult.isLeft()) {
      throw new BadRequestException("Invalid user data");
    }

    const user = userResult.value;
    await this.userRepository.save(user);
    console.log("Registered user with ID:", user.id.value);

    return user.id.value;
  }
}
```

---

### Paso 7: Crear el Controlador

Expone endpoints REST para las operaciones.

```typescript
import { Controller, Post, Body, HttpCode, HttpStatus, Res } from "@nestjs/common";
import type { Response } from "express";
import { UserServicePort, RegisterUserCommand } from "@app/users/domain/ports/in/users.service.port";
import { RegisterUserDto } from "@app/users/infrastructure/presentation/dtos/register-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UserServicePort) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto, @Res() res: Response): Promise<void> {
    const command: RegisterUserCommand = {
      username: dto.username,
    };

    const userId = await this.usersService.registerUser(command);

    res.setHeader("Location", `/users/${userId}`);
    res.status(HttpStatus.CREATED).send();
  }
}
```

---

### Paso 8: Configurar el Módulo de Usuarios

Configura Mongoose y la inyección de dependencias.

```typescript
import { UserServicePort } from "@app/users/domain/ports/in/users.service.port";
import { UserEntity, UserSchema } from "@app/users/infrastructure/persistence/entities/user.entity";
import { UserMapper } from "@app/users/infrastructure/persistence/user.mapper";
import { UsersController } from "@app/users/infrastructure/presentation/controllers/users.controller";
import { UsersService } from "@app/users/application/services/users.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "@app/users/domain/ports/out/user.repository";
import { UsersRepositoryMongoose } from "@app/users/infrastructure/persistence/user.repository-mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [
    UserMapper,
    {
      provide: UserRepository,
      useClass: UsersRepositoryMongoose,
    },
    {
      provide: UserServicePort,
      useClass: UsersService,
    },
  ],
})
export class UserModule {}
```
