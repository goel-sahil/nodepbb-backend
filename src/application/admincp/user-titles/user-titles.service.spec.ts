import { Test, TestingModule } from '@nestjs/testing';
import { UserTitlesService } from './user-titles.service';

describe('UserTitlesService', () => {
  let service: UserTitlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTitlesService],
    }).compile();

    service = module.get<UserTitlesService>(UserTitlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
