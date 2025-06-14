import { Module } from '@nestjs/common';
import { WishlistItemsService } from './wishlist-items.service';
import { WishlistItemsController } from './wishlist-items.controller';

@Module({
  providers: [WishlistItemsService],
  controllers: [WishlistItemsController],
})
export class WishlistItemsModule {}
