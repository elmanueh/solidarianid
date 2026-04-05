import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import type { OpenAPIObject } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Generar documentación Swagger
  const config = new DocumentBuilder()
    .setTitle('SolidarianID: Users Microservice')
    .setDescription('The SolidarianID`s Users Microservice API documentation')
    .setVersion('0.1')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/users/docs', app, document);

  // Generar el YAML con la documentación Swagger
  const yamlString: string = dump(document);

  const outPath =
    process.env.IN_DOCKER === 'true' ? '/app/users-swagger.yaml' : join(process.cwd(), 'users-swagger.yaml');

  writeFileSync(outPath, yamlString, 'utf8');

  // Habilitar validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // Habilitar filtro global de excepciones
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.get<string>('KAFKA_USERS_CLIENT_ID') ?? 'users',
        brokers: configService.get<string>('KAFKA_BROKERS')?.split(',') ?? ['localhost:9092'],
      },
      consumer: {
        groupId: configService.get<string>('KAFKA_USERS_CONSUMER_GROUP_ID') ?? 'users-consumer-group',
      },
    },
  });

  await app.startAllMicroservices();

  app.enableCors({
    origin: true,
    exposedHeaders: ['Location'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
  });

  const port = configService.get<number>('USERS_PORT') ?? 3001;
  console.log(`Server running on port ${port}`);
  await app.listen(port);
}

void bootstrap();
