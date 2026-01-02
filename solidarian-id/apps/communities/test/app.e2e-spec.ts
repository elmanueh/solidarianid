import { CommunitiesModule } from '@app/communities/communities/communities.module';
import { PostgreSQLTestModule, TestServerHelper, PostgreSQLTestContainer } from '@solidarianid/testing';

describe('CommunitiesController (e2e)', () => {
  let server!: TestServerHelper;

  beforeAll(async () => {
    const databaseModule = await PostgreSQLTestModule.forRoot();
    server = new TestServerHelper();
    await server.create({
      imports: [databaseModule, CommunitiesModule],
    });
  });

  afterAll(async () => {
    await server.close();
    await PostgreSQLTestContainer.getInstance().stop();
  });

  it('/ (GET)', () => {
    return server.getRequest().get('/').expect(404);
  });
});
