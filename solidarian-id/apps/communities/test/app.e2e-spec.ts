import { CommunitiesModule } from '@app/communities/communities.module';
import { PostgreSQLTestModule, TestServerHelper, KafkaTestModule, TestContainerLifecycle } from '@solidarianid/testing';

describe('CommunitiesController (e2e)', () => {
  let server!: TestServerHelper;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot();
    server = new TestServerHelper();
    await server.create({
      imports: [databaseModule, messageModule, CommunitiesModule],
    });
  });

  afterAll(async () => {
    await server.close();
    await TestContainerLifecycle.getInstance().stopItSelfManaged();
  });

  it('/ (GET)', () => {
    return server.getRequest().get('/').expect(404);
  });
});
