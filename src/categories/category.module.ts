import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Product } from 'src/products/entities/product.entity';
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
import { FetchProductsByCategorySlugService } from './service/fetch-products-by-category-slug.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product]), CommonModule],
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
    FetchProductsByCategorySlugService,
  ],
  controllers: [CategoryController],
  exports: [FetchCategoryByIdService],
})
export class CategoryModule {}
