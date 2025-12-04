import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddToCartDto, UpdateCartItemDto } from './carts.dto';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Get('me')
  async getMyCart(@Request() req) {
    return this.cartsService.getCart(req.user.sub);
  }

  @Post('items')
  async addItem(@Request() req, @Body() addToCartDto: AddToCartDto) {
    await this.cartsService.addItem(
      req.user.sub,
      addToCartDto.productId,
      addToCartDto.quantity,
    );
    return this.cartsService.getCart(req.user.sub);
  }

  @Patch('items/:id')
  async updateItem(
    @Request() req,
    @Param('id') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    await this.cartsService.updateItem(
      itemId,
      updateCartItemDto.quantity,
      req.user.sub,
    );
    return this.cartsService.getCart(req.user.sub);
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.OK)
  async removeItem(@Request() req, @Param('id') itemId: string) {
    await this.cartsService.removeItem(itemId, req.user.sub);
    return this.cartsService.getCart(req.user.sub);
  }

  @Delete('clear')
  @HttpCode(HttpStatus.OK)
  async clearCart(@Request() req) {
    await this.cartsService.clearCart(req.user.sub);
    return { success: true };
  }
}
