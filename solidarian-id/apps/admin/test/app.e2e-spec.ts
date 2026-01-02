import { DynamicModule } from '@nestjs/common';
import { AdminModule } from '@app/admin/administrator/admin.module';
import { AuthModule } from '@app/admin/auth/auth.module';
import { AppController } from '@app/admin/app.controller';
import { MongoDBTestModule, TestServerHelper, MongoDBTestContainer } from '@solidarianid/testing';

describe('AppController (e2e)', () => {
  let server!: TestServerHelper;

  beforeAll(async () => {
    const databaseModule: DynamicModule = await MongoDBTestModule.forRoot();
    server = new TestServerHelper();
    await server.create({
      imports: [databaseModule, AdminModule, AuthModule],
      controllers: [AppController],
    });
  });

  afterAll(async () => {
    if (server) await server.close();
    await MongoDBTestContainer.getInstance().stop();
  });

  it('/ (GET)', () => {
    return server.getRequest().get('/').expect(302).expect('Location', '/login');
  });
});
