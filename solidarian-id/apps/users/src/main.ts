import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { OpenAPIObject } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { writeFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';

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
  SwaggerModule.setup('users/docs', app, document);

  // Generar el YAML con la documentación Swagger
  const yamlString: string = dump(document);
  writeFileSync('./users-swagger.yaml', yamlString, 'utf8');

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
  const port = configService.get<number>('PORT') ?? 3000;
  console.log(`Server running on port ${port}`);
  await app.listen(port);
}

void bootstrap();
