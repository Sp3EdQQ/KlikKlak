import { Test, TestingModule } from '@nestjs/testing';
import { WistlistItemsService } from './wistlist-items.service';

describe('WistlistItemsService', () => {
  let service: WistlistItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WistlistItemsService],
    }).compile();

    service = module.get<WistlistItemsService>(WistlistItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
