import {
  CacheModule,
  commonConfig,
  GatewayMiddleware,
  JwtStrategy,
} from '@the-tech-nerds/common-services';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './categories/category.module';
import { BrandModule } from './brands/brand.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { routes } from './route';
import configuration from './config/configuration';
import { ShopModule } from './shops/shop.module';
import * as ormconfig from './database';
import { SupplierModule } from './suppliers/supplier.module';
import { CommonModule } from './common/common.module';
import { InventoryModule } from './inventory/inventory.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, commonConfig],
    }),
    TypeOrmModule.forRoot(ormconfig),
    RouterModule.forRoutes(routes),
    CacheModule,
    ShopModule,
    ProductModule,
    InventoryModule,
    SupplierModule,
    CategoryModule,
    BrandModule,
    WishlistModule,
    CommonModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt_secret'),
        signOptions: { expiresIn: configService.get('jwt_expiration') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GatewayMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
