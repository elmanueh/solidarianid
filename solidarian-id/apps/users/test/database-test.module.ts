import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../src/infrastructure/persistence/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [UserEntity],
      synchronize: true,
      dropSchema: true,
    }),
  ],
})
export class DatabaseTestModule {}
