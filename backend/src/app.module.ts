import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './database/database';
import * as schema from './database/index';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database], isGlobal: true }),

    DrizzlePostgresModule.registerAsync({
      tag: 'DB',
      useFactory(configService: ConfigService) {
        return {
          postgres: {
            url: configService.get<string>('database_url')!,
          },
          config: {
            schema: { ...schema },
          },
        };
      },
      inject: [ConfigService],
    }),

    ProductsModule,

    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
