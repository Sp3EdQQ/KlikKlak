import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './database/database';
import * as schema from './database/index';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';
import { ProductTagsModule } from './modules/product-tags/product-tags.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { WishlistModule } from './modules/wishlists/wishlists.module';
import { WishlistItemsModule } from './modules/wishlist-items/wishlist-items.module';
import { UsersModule } from './modules/users/users.module';
import { CpusModule } from './modules/cpus/cpus.module';
import { GpusModule } from './modules/gpus/gpus.module';
import { RamsModule } from './modules/rams/rams.module';
import { SsdsModule } from './modules/ssds/ssds.module';
import { HddsModule } from './modules/hdds/hdds.module';
import { MotherboardsModule } from './modules/motherboards/motherboards.module';
import { PsusModule } from './modules/psus/psus.module';
import { CpuCoolersModule } from './modules/cpu-coolers/cpu-coolers.module';
import { MonitorsModule } from './modules/monitors/monitors.module';
import { CasesModule } from './modules/cases/cases.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),

    DrizzlePostgresModule.registerAsync({
      tag: 'DB',
      useFactory(configService: ConfigService) {
        const dbUrl = process.env.DATABASE_URL || configService.get<string>('database.url');
        console.log('Database URL:', dbUrl);
        return {
          postgres: {
            url: dbUrl!,
          },
          config: {
            schema: { ...schema },
          },
        };
      },
      inject: [ConfigService],
    }),

    DatabaseModule.forRoot({
      host: process.env.POSTGRES_HOST || (process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost'),
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'adminadmin',
      database: process.env.POSTGRES_DB || 'klikklakdb',
    }),

    AuthModule,

    ProductsModule,

    CategoriesModule,

    TagsModule,

    ProductTagsModule,

    CartsModule,

    CartItemsModule,

    AddressesModule,

    OrdersModule,

    OrderItemsModule,

    ReviewsModule,

    WishlistModule,

    WishlistItemsModule,

    UsersModule,

    CpusModule,

    GpusModule,

    RamsModule,

    SsdsModule,

    HddsModule,

    MotherboardsModule,

    PsusModule,

    CpuCoolersModule,

    MonitorsModule,

    CasesModule,

    ChatbotModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule { }
