import { AdminModule } from '@app/admin/administrator/admin.module';
import { AuthModule } from '@app/admin/auth/auth.module';
import { AppController } from '@app/admin/app.controller';
import { MongoDBTestModule, TestServerHelper, KafkaTestModule, TestContainerLifecycle } from '@solidarianid/testing';

describe('AppController (e2e)', () => {
  let server!: TestServerHelper;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await MongoDBTestModule.forRoot();
    server = new TestServerHelper();
    await server.create({
      imports: [messageModule, databaseModule, AdminModule, AuthModule],
      controllers: [AppController],
    });
  });

  afterAll(async () => {
    await server.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  it('/ (GET)', () => {
    return server.getRequest().get('/').expect(302).expect('Location', '/login');
  });
});
