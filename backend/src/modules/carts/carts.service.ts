import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import type { DrizzleDB } from 'src/database/drizzle.service';
import { carts } from './carts.schema';
import { cartItems } from '../cart-items/cart-items.schema';
import { products } from 'src/database/schema';
import { DRIZZLE } from 'src/database/database.module-definition';

@Injectable()
export class CartsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async getOrCreateCart(userId: string) {
    const existingCart = await this.db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId))
      .limit(1);

    if (existingCart.length > 0) {
      return existingCart[0];
    }

    const newCart = await this.db
      .insert(carts)
      .values({ userId })
      .returning();

    return newCart[0];
  }

  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    const items = await this.db
      .select({
        id: cartItems.id,
        cartId: cartItems.cartId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        product: {
          id: products.id,
          name: products.name,
          price: products.price,
          imageUrl: products.imageUrl,
          stock: products.stock,
          categoryId: products.categoryId,
        },
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cart.id));

    const total = items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    return {
      id: cart.id,
      userId: cart.userId,
      items,
      total,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  async addItem(userId: string, productId: string, quantity: number) {
    // Verify product exists and has stock
    const product = await this.db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      throw new NotFoundException('Product not found');
    }

    if (product[0].stock < quantity) {
      throw new Error('Insufficient stock');
    }

    const cart = await this.getOrCreateCart(userId);

    // Check if item already exists in cart
    const existingItem = await this.db
      .select()
      .from(cartItems)
      .where(
        and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId)),
      )
      .limit(1);

    if (existingItem.length > 0) {
      const newQuantity = existingItem[0].quantity + quantity;

      if (product[0].stock < newQuantity) {
        throw new Error('Insufficient stock');
      }

      const updated = await this.db
        .update(cartItems)
        .set({ quantity: newQuantity })
        .where(eq(cartItems.id, existingItem[0].id))
        .returning();

      return updated[0];
    }

    const newItem = await this.db
      .insert(cartItems)
      .values({
        cartId: cart.id,
        productId,
        quantity,
      })
      .returning();

    return newItem[0];
  }

  async updateItem(itemId: string, quantity: number, userId: string) {
    const item = await this.db
      .select({
        cartItem: cartItems,
        cart: carts,
        product: products,
      })
      .from(cartItems)
      .innerJoin(carts, eq(cartItems.cartId, carts.id))
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.id, itemId))
      .limit(1);

    if (item.length === 0) {
      throw new NotFoundException('Cart item not found');
    }

    if (item[0].cart.userId !== userId) {
      throw new Error('Unauthorized');
    }

    if (item[0].product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    const updated = await this.db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, itemId))
      .returning();

    return updated[0];
  }

  async removeItem(itemId: string, userId: string) {
    const item = await this.db
      .select({
        cartItem: cartItems,
        cart: carts,
      })
      .from(cartItems)
      .innerJoin(carts, eq(cartItems.cartId, carts.id))
      .where(eq(cartItems.id, itemId))
      .limit(1);

    if (item.length === 0) {
      throw new NotFoundException('Cart item not found');
    }

    if (item[0].cart.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await this.db.delete(cartItems).where(eq(cartItems.id, itemId));

    return { success: true };
  }

  async clearCart(userId: string) {
    const cart = await this.db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId))
      .limit(1);

    if (cart.length === 0) {
      return { success: true };
    }

    await this.db.delete(cartItems).where(eq(cartItems.cartId, cart[0].id));

    return { success: true };
  }
}
