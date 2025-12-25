import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { engine } from 'express-handlebars';
import { AppModule } from '@app/admin/app.module';
import { HttpExceptionFilter } from '@app/admin/administrator/controllers/filters/http-exception.filter';

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

  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, 'views'));

  app.useStaticAssets(join(__dirname, 'public'));

  app.set('view cache', false);

  // Configurar filtro global de excepciones HTTP
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}

void bootstrap();
