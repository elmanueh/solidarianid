import { NestFactory } from '@nestjs/core';
import { CommunitiesModule } from './communities.module';

async function bootstrap() {
  const app = await NestFactory.create(CommunitiesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
