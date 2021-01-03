import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@technerds/common-services';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ListProductsService } from './services/list-products.service';
import { CreateShopService } from './services/shop/create-shop.service';
import { ShopController } from './controllers/shop.controller';
import { Shop } from './entities/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Shop])],
  providers: [ListProductsService, CreateShopService, ApiResponseService],
  controllers: [ProductController, ShopController],
})
export class ProductModule {}
