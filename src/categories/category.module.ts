import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Category } from './entities/category.entity';
import { CategoryController } from './controller/category.controller';
import { UpdateCategoryService } from './service/update-category.service';
import { CreateCategoryService } from './service/create-category.service';
import { DeleteCategoryService } from './service/delete-category.service';
import { FetchCategoryByIdService } from './service/fetch-category-by-id.service';
import { ListCategoryService } from './service/list-category.service';
import { ChangeStatusService } from './service/change-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CreateCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    FetchCategoryByIdService,
    ListCategoryService,
    ChangeStatusService,
    ApiResponseService,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
