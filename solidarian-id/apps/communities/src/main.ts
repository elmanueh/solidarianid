import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import type { OpenAPIObject } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { dump } from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { AppModule } from './app.module';

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
  SwaggerModule.setup('api/communities/docs', app, document);

  // Generar el YAML con la documentación Swagger
  const yamlString: string = dump(document);

  const outPath =
    process.env.IN_DOCKER === 'true'
      ? '/app/communities-swagger.yaml'
      : join(process.cwd(), 'communities-swagger.yaml');

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
  app.use(cookieParser());

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

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: configService.get<string>('COMMUNITIES_GRPC_URL') ?? '0.0.0.0:50052',
      package: 'solidarianid.grpc.communities.v1',
      protoPath: join(process.cwd(), 'libs/grpc-common/spec/solidarianid/grpc/communities/communities.proto'),
    },
  });

  // TODO: revisar esto para produción, ya que puede ser un riesgo de seguridad permitir cualquier origen con credenciales.
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 204,
    maxAge: 600,
  });

  await app.startAllMicroservices();

  app.setGlobalPrefix('api');

  const port = configService.get<number>('COMMUNITIES_PORT') ?? 3002;
  const grpcUrl = configService.get<string>('COMMUNITIES_GRPC_URL') ?? '0.0.0.0:50052';
  console.log(`Server running on port ${port}`);
  console.log(`gRPC server running on ${grpcUrl}`);
  await app.listen(port);
}

void bootstrap();
