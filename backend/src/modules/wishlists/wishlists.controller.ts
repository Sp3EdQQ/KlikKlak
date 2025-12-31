import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { WishlistService } from './wishlists.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService) { }

    @Get()
    async getWishlistItems(@Request() req) {
        return this.wishlistService.getWishlistItems(req.user.id);
    }

    @Post('add')
    async addItem(@Request() req, @Body('productId') productId: string) {
        return this.wishlistService.addItem(req.user.id, productId);
    }

    @Delete('remove/:productId')
    async removeItem(@Request() req, @Param('productId') productId: string) {
        return this.wishlistService.removeItem(req.user.id, productId);
    }

    @Get('check/:productId')
    async checkItem(@Request() req, @Param('productId') productId: string) {
        const isInWishlist = await this.wishlistService.isInWishlist(
            req.user.id,
            productId,
        );
        return { isInWishlist };
    }
}
