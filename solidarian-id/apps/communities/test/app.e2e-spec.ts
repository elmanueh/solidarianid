import { CommunitiesSharedModule } from '@app/communities/shared/communities-shared.module';
import { KafkaTestModule, PostgreSQLTestModule, TestContainerLifecycle, TestServerHelper } from '@solidarianid/testing';

describe('CommunitiesController (e2e)', () => {
  let server!: TestServerHelper;

  beforeAll(async () => {
    const messageModule = await KafkaTestModule.forRoot();
    const databaseModule = await PostgreSQLTestModule.forRoot();
    server = new TestServerHelper();
    await server.create({
      imports: [databaseModule, messageModule, CommunitiesSharedModule],
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
