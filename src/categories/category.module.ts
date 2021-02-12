import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { DeleteShopService } from './service/shop/delete.service';
import { ListShopService } from './service/shop/fetch-all.service';
import { CreateCategoryService } from './service/shop/create-shop.service';
import { UpdateCategoryService } from './service/shop/update-shop.service';
import { FetchShopByIdService } from './service/shop/fetch-by-id.service';
import { Shop } from './entities/shop.entity';
import { CategoryController } from './controller/shop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  providers: [
    CreateCategoryService,
    UpdateCategoryService,
    DeleteShopService,
    FetchShopByIdService,
    ListShopService,
    ApiResponseService,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
