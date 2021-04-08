import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CommonModule } from '../common/common.module';
import { Category } from './entities/category.entity';
import { CategoryController } from './controller/category.controller';
import { UpdateCategoryService } from './service/update-category.service';
import { CreateCategoryService } from './service/create-category.service';
import { DeleteCategoryService } from './service/delete-category.service';
import { FetchCategoryByIdService } from './service/fetch-category-by-id.service';
import { ListCategoryService } from './service/list-category.service';
import { ChangeStatusService } from './service/change-status.service';
import { MenuCategoryService } from './service/menu-category';
import { FetchCategoryBySlugService } from './service/fetch-category-by-slug.service';
import { FetchCategoryByShopService } from './service/fetch-category-by-shop.service';
import { FetchShopByIdService } from '../shops/service/shop/fetch-by-id.service';
import { Shop } from '../shops/entities/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Shop]), CommonModule],
  providers: [
    CreateCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    FetchCategoryByIdService,
    ListCategoryService,
    ChangeStatusService,
    ApiResponseService,
    MenuCategoryService,
    FetchCategoryBySlugService,
    FetchCategoryByShopService,
    FetchShopByIdService,
  ],
  controllers: [CategoryController],
  exports: [FetchCategoryByIdService],
})
export class CategoryModule {}
