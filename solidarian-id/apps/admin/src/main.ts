import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { engine } from 'express-handlebars';
import { AppModule } from '@app/admin/app.module';
import session from 'express-session';
import { HttpExceptionFilter } from '@app/admin/administrator/controllers/filters/http-exception.filter';
import { AuthenticationErrorFilter } from './administrator/controllers/filters/authentication-error.filter';
import { ConflictErrorFilter } from './administrator/controllers/filters/conflict-error.filter';
import { InternalServerErrorFilter } from './administrator/controllers/filters/internal-server-error.filter';
import { NotFoundErrorFilter } from './administrator/controllers/filters/not-found-error.filter';
import { ValidationErrorFilter } from './administrator/controllers/filters/validation-error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      layoutsDir: join(__dirname, 'views/layouts'),
      partialsDir: join(__dirname, 'views/partials'),
      defaultLayout: 'auth',
      helpers: {
        // Helper para comparación de igualdad
        eq: (a: any, b: any) => a === b,
        // Helper para comparación mayor que
        gt: (a: any, b: any) => a > b,
        // Helper para verificar si un array tiene elementos
        hasLength: (arr: any[]) => arr && arr.length > 0,
      },
    }),
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'YouHaveToChangeThisSecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        sameSite: 'lax',
      },
    }),
  );

  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, 'views'));

  app.useStaticAssets(join(__dirname, 'public'));

  app.set('view cache', false);

  // Configurar ValidationPipe global para validar DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configurar filtros globales de excepciones
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new InternalServerErrorFilter(),
    new ValidationErrorFilter(),
    new NotFoundErrorFilter(),
    new ConflictErrorFilter(),
    new AuthenticationErrorFilter(),
  );

  // Configurar Kafka como microservicio para consumir eventos
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.get<string>('KAFKA_ADMIN_CLIENT_ID') ?? 'admin',
        brokers: configService.get<string>('KAFKA_BROKERS')?.split(',') ?? ['localhost:9092'],
      },
      consumer: {
        groupId: configService.get<string>('KAFKA_ADMIN_CONSUMER_GROUP_ID') ?? 'admin-consumer-group',
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(configService.get<string>('ADMIN_PORT') || 5000);
}

void bootstrap();
