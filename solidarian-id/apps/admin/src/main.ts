import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'node:path';
import { engine } from 'express-handlebars';
import { HttpExceptionFilter } from './administrator/controllers/filters/http-exception.filter';
import { ValidationExceptionFilter } from './administrator/controllers/filters/validation-exception.filter';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
    new ValidationExceptionFilter(),
    new HttpExceptionFilter(),
  );

  await app.listen(3000);
}

void bootstrap();
