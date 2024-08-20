import { Test, TestingModule } from '@nestjs/testing';
import { ThreadPrefixesController } from './thread-prefixes.controller';
import { ThreadPrefixesService } from './thread-prefixes.service';

describe('ThreadPrefixesController', () => {
  let controller: ThreadPrefixesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadPrefixesController],
      providers: [ThreadPrefixesService],
    }).compile();

    controller = module.get<ThreadPrefixesController>(ThreadPrefixesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
