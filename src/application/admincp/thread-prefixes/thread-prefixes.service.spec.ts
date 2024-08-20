import { Test, TestingModule } from '@nestjs/testing';
import { ThreadPrefixesService } from './thread-prefixes.service';

describe('ThreadPrefixesService', () => {
  let service: ThreadPrefixesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadPrefixesService],
    }).compile();

    service = module.get<ThreadPrefixesService>(ThreadPrefixesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
