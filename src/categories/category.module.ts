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

@Module({
  imports: [TypeOrmModule.forFeature([Category]), CommonModule],
  providers: [
    CreateCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    FetchCategoryByIdService,
    ListCategoryService,
    ChangeStatusService,
    ApiResponseService,
    MenuCategoryService,
  ],
  controllers: [CategoryController],
  exports: [FetchCategoryByIdService],
})
export class CategoryModule {}
