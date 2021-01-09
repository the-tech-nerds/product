import {
  CacheModule,
  commonConfig,
  GatewayMiddleware,
} from '@technerds/common-services';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { routes } from './route';
import configuration from './config/configuration';
import { TypeOrmConfig } from './database';
import { ShopModule } from './shops/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, commonConfig],
    }),
    TypeOrmConfig,
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
