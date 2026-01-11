import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        getTypeOrmConfig({
          config,
          entities: [UserEntity],
          migrationsPath: 'apps/users/src/migrations/*.ts',
          migrationsDistPath: 'dist/apps/users/src/migrations/*.js',
        }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
