import { Controller, Get } from '@nestjs/common';
import { WishlistService } from './wishlists.service';

@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService) { }

    @Get()
    findAll() {
        return this.wishlistService.findAll();
    }
}
