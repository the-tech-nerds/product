import {
  CacheModule,
  commonConfig,
  GatewayMiddleware,
} from '@technerds/common-services';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { routes } from './route';
import configuration from './config/configuration';
import { ShopModule } from './shops/shop.module';
import * as ormconfig from './database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, commonConfig],
    }),
    TypeOrmModule.forRoot(ormconfig),
    RouterModule.forRoutes(routes),
    ProductModule,
    CacheModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GatewayMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
