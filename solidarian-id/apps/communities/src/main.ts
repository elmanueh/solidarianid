import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { OpenAPIObject } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Generar documentación Swagger
  const config = new DocumentBuilder()
    .setTitle('SolidarianID: Communities Microservice')
    .setDescription('The SolidarianID`s Communities Microservice API documentation')
    .setVersion('0.1')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('communities/docs', app, document);

  // Generar el YAML con la documentación Swagger
  const yamlString: string = dump(document);
  writeFileSync('./communities-swagger.yaml', yamlString, 'utf8');
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
        clientId: configService.get<string>('KAFKA_COMMUNITIES_CLIENT_ID') ?? 'communities',
        brokers: configService.get<string>('KAFKA_BROKERS')?.split(',') ?? ['localhost:9092'],
      },
      consumer: {
        groupId: configService.get<string>('KAFKA_COMMUNITIES_CONSUMER_GROUP_ID') ?? 'communities-consumer-group',
      },
    },
  });

  app.setGlobalPrefix('api/communities');

  await app.startAllMicroservices();

  const port = configService.get<number>('COMMUNITIES_PORT') ?? 3002;
  console.log(`Server running on port ${port}`);
  await app.listen(port);
}

void bootstrap();
