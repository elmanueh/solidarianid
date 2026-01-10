import { AuthenticationErrorFilter } from '@app/admin/administrator/controllers/filters/authentication-error.filter';
import { ConflictErrorFilter } from '@app/admin/administrator/controllers/filters/conflict-error.filter';
import { HttpExceptionFilter } from '@app/admin/administrator/controllers/filters/http-exception.filter';
import { InternalServerErrorFilter } from '@app/admin/administrator/controllers/filters/internal-server-error.filter';
import { NotFoundErrorFilter } from '@app/admin/administrator/controllers/filters/not-found-error.filter';
import { RepositoryExceptionFilter } from '@app/admin/administrator/controllers/filters/repository-exception.filter';
import { ValidationErrorFilter } from '@app/admin/administrator/controllers/filters/validation-error.filter';
import { AppModule } from '@app/admin/app.module';
import { GlobalExceptionFilter } from '@app/utils/http/filters/global-exception-filter';
import { odsNames } from '@app/admin/utils/data-utils';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      layoutsDir: join(process.cwd(), 'apps/admin/views/layouts'),
      partialsDir: join(process.cwd(), 'apps/admin/views/partials'),
      defaultLayout: 'auth',
      helpers: {
        // Helper para comparación de igualdad
        eq: (a: any, b: any) => a === b,
        // Helper para comparación mayor que
        gt: (a: any, b: any) => a > b,
        // Helper para comparación menor que
        lt: (a: any, b: any) => a < b,
        // Helper para verificar si un array tiene elementos
        hasLength: (arr: any[]) => arr && arr.length > 0,
        // Helper para formatear fechas
        formatDate: (date: Date | string) => {
          if (!date) return '';
          const d = new Date(date);
          const day = d.getDate();
          const month = d.getMonth();
          const year = d.getFullYear();
          const months = [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre',
          ];
          return `${day} de ${months[month]} de ${year}`;
        },
        // Helper para formatear fechas como DD/MM/AAAA
        formatDateShort: (date: Date | string) => {
          if (!date) return '';
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          return `${day}/${month}/${year}`;
        },
        // Helper para obtener el título del ODS
        odsTitle: (odsNumber: string | number) => {
          const key = String(odsNumber);
          return odsNames[key] || '';
        },
        // Helper para ordenar arrays numéricos (ODS) y eliminar duplicados
        sort: (arr: any): any => {
          if (!Array.isArray(arr)) return arr;
          const copy = arr.slice();
          const sorted = copy.sort((a: any, b: any) => a - b);
          return [...new Set(sorted)];
        },
        // Helper para suma
        add: (a: number, b: number) => a + b,
        // Helper para resta
        subtract: (a: number, b: number) => a - b,
        // Helper para generar array de números dentro de un rango
        range: (start: number, end: number) => {
          const arr = [];
          for (let i = start; i < end; i++) {
            arr.push(i);
          }
          return arr;
        },
      },
    }),
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'YouHaveToChangeThisSecret',
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
  app.setBaseViewsDir(join(process.cwd(), 'apps/admin/views'));

  app.useStaticAssets(join(process.cwd(), 'apps/admin/public'));

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
    new NotFoundErrorFilter(),
    new RepositoryExceptionFilter(),
    new ValidationErrorFilter(),
    new ConflictErrorFilter(),
    new AuthenticationErrorFilter(),
    new InternalServerErrorFilter(),
    new GlobalExceptionFilter(),
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

  app.enableCors({
    origin: configService.get<string>('API_BASE_ADMIN_URL') ?? '*',
    exposedHeaders: ['Location'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
  });

  const port = configService.get<number>('ADMIN_PORT') ?? 3000;
  console.log(`Server running on port ${port}`);
  await app.listen(port);
}

void bootstrap();
