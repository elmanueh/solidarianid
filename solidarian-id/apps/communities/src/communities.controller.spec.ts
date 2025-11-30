import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

describe('CommunitiesController', () => {
  let communitiesController: CommunitiesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommunitiesController],
      providers: [CommunitiesService],
    }).compile();

    communitiesController = app.get<CommunitiesController>(CommunitiesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(communitiesController.getHello()).toBe('Hello World!');
    });
  });
});
