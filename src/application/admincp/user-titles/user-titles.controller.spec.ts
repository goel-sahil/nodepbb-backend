import { Test, TestingModule } from '@nestjs/testing';
import { UserTitlesController } from './user-titles.controller';
import { UserTitlesService } from './user-titles.service';

describe('UserTitlesController', () => {
  let controller: UserTitlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTitlesController],
      providers: [UserTitlesService],
    }).compile();

    controller = module.get<UserTitlesController>(UserTitlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
