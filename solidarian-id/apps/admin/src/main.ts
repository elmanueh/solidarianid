import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config/dist/config.service';

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
  const port = configService.get<number>('ADMIN_PORT') ?? 3000;
  console.log(`Server running on port ${port}`);
  await app.listen(port);
}

void bootstrap();
