import { NestFactory } from '@nestjs/core';
import { CommunitiesModule } from './communities.module';
import { AppDataSource } from 'apps/communities/src/infrastructure/persistence/data-source';

async function bootstrap() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const app = await NestFactory.create(CommunitiesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
