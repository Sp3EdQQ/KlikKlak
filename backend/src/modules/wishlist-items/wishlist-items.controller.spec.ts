import { Test, TestingModule } from '@nestjs/testing';
import { WistlistItemsController } from './wistlist-items.controller';

describe('WistlistItemsController', () => {
  let controller: WistlistItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WistlistItemsController],
    }).compile();

    controller = module.get<WistlistItemsController>(WistlistItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
