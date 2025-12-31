import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';
import * as schema from '../../database/index';
import { wishlists } from './wishlists.schema';
import { wishlistItems } from '../wishlist-items/wishlist-items.schema';

@Injectable()
export class WishlistService {
    constructor(
        @Inject('DB') private readonly drizzle: NodePgDatabase<typeof schema>,
    ) { }

    async findAll() {
        return this.drizzle.select().from(wishlists);
    }

    async findByUserId(userId: string) {
        const wishlist = await this.drizzle
            .select()
            .from(wishlists)
            .where(eq(wishlists.userId, userId))
            .limit(1);

        if (!wishlist[0]) {
            // Jeśli nie ma wishlisty, utwórz ją
            const newWishlist = await this.drizzle
                .insert(wishlists)
                .values({ userId })
                .returning();
            return newWishlist[0];
        }

        return wishlist[0];
    }

    async getWishlistItems(userId: string) {
        const wishlist = await this.findByUserId(userId);

        const items = await this.drizzle
            .select({
                id: wishlistItems.id,
                productId: wishlistItems.productId,
                product: schema.products,
                addedAt: wishlistItems.createdAt,
            })
            .from(wishlistItems)
            .leftJoin(schema.products, eq(wishlistItems.productId, schema.products.id))
            .where(eq(wishlistItems.wishlistId, wishlist.id));

        return items;
    }

    async addItem(userId: string, productId: string) {
        const wishlist = await this.findByUserId(userId);

        // Sprawdź czy produkt już jest w wishliście
        const existing = await this.drizzle
            .select()
            .from(wishlistItems)
            .where(
                and(
                    eq(wishlistItems.wishlistId, wishlist.id),
                    eq(wishlistItems.productId, productId),
                ),
            )
            .limit(1);

        if (existing[0]) {
            return { message: 'Produkt już jest w liście życzeń', item: existing[0] };
        }

        const newItem = await this.drizzle
            .insert(wishlistItems)
            .values({
                wishlistId: wishlist.id,
                productId,
            })
            .returning();

        return { message: 'Dodano do listy życzeń', item: newItem[0] };
    }

    async removeItem(userId: string, productId: string) {
        const wishlist = await this.findByUserId(userId);

        const result = await this.drizzle
            .delete(wishlistItems)
            .where(
                and(
                    eq(wishlistItems.wishlistId, wishlist.id),
                    eq(wishlistItems.productId, productId),
                ),
            )
            .returning();

        if (!result[0]) {
            throw new NotFoundException('Produkt nie znaleziony w liście życzeń');
        }

        return { message: 'Usunięto z listy życzeń' };
    }

    async isInWishlist(userId: string, productId: string): Promise<boolean> {
        const wishlist = await this.findByUserId(userId);

        const item = await this.drizzle
            .select()
            .from(wishlistItems)
            .where(
                and(
                    eq(wishlistItems.wishlistId, wishlist.id),
                    eq(wishlistItems.productId, productId),
                ),
            )
            .limit(1);

        return !!item[0];
    }
}
