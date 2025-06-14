import { Module } from '@nestjs/common';
import { WishlistService } from './wishlists.service';
import { WishlistController } from './wishlists.controller';

@Module({
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
