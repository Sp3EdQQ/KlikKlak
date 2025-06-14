import { Module } from '@nestjs/common';
import { WistlistItemsService } from './wistlist-items.service';
import { WistlistItemsController } from './wistlist-items.controller';

@Module({
  providers: [WistlistItemsService],
  controllers: [WistlistItemsController]
})
export class WistlistItemsModule {}
