import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthViewController } from './controllers/auth-view.controller';
import { AuthApiController } from './controllers/auth-api.controller';
import { AuthService } from '../administrator/model/domain/services/auth.service';
import { AuthServiceImpl } from './model/services/impl/auth.service.impl';
import { PasswordService } from './model/services/password.service';
import { PasswordServiceImpl } from './model/services/impl/password.service.impl';
import { AdministratorRepositoryPort } from '../administrator/model/domain/ports/output/administrator.repository.port';
import { AdministratorRepositoryAdapter } from './model/infrastructure/persistence/repositories/administrator.repository';
import {
  AdministratorEntity,
  AdministratorSchema,
} from './model/infrastructure/persistence/entities/administrator.entity';
import { AdministratorEntityMapper } from './model/infrastructure/persistence/mapper/administrator.entity.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdministratorEntity.name, schema: AdministratorSchema },
    ]),
  ],
  controllers: [AuthViewController, AuthApiController],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: PasswordService,
      useClass: PasswordServiceImpl,
    },
    {
      provide: AdministratorRepositoryPort,
      useClass: AdministratorRepositoryAdapter,
    },
    AdministratorEntityMapper,
  ],
  exports: [AuthService, PasswordService, AdministratorRepositoryPort],
})
export class AuthModule {}
