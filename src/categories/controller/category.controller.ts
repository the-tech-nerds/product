import {
  ApiResponseService,
  CurrentUser,
  UserGuard,
} from '@the-tech-nerds/common-services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCategoryService } from '../service/create-category.service';
import { CategoryRequest } from '../request/category.request';
import { Category } from '../entities/category.entity';
import { UpdateCategoryService } from '../service/update-category.service';
import { FetchCategoryByIdService } from '../service/fetch-category-by-id.service';
import { ListCategoryService } from '../service/list-category.service';
import { ChangeStatusService } from '../service/change-status.service';
import { DeleteCategoryService } from '../service/delete-category.service';

@Controller()
export class CategoryController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createCategoryService: CreateCategoryService,
    private readonly updateCategoryService: UpdateCategoryService,
    private readonly fetchCategoryByIdService: FetchCategoryByIdService,
    private readonly listCategoryService: ListCategoryService,
    private readonly changeStatusService: ChangeStatusService,
    private readonly deleteCategoryService: DeleteCategoryService,
  ) {}

  @UseGuards(UserGuard)
  @Post('/')
  async createCategory(
    @CurrentUser('id') userId: any,
    @Body() categoryRequest: CategoryRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createCategoryService.create(
      userId,
      categoryRequest,
    );
    return this.apiResponseService.successResponse(
      ['category created successfully'],
      data as Category,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/all')
  async getCategories(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listCategoryService.execute();
    return this.apiResponseService.successResponse(
      ['Category list fetched successfully'],
      data as Category[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/:id')
  async updateCategory(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() categoryRequest: CategoryRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateCategoryService.execute(
      id,
      userId,
      categoryRequest,
    );
    return this.apiResponseService.successResponse(
      ['Category has been updated successfully'],
      data as Category,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/:id')
  async getCategoryById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchCategoryByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Category fetched successfully'],
      data as Category,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/:id/status')
  async changeRoleStatus(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.changeStatusService.execute(id);
    return this.apiResponseService.successResponse(
      ['category status updated successfully'],
      data as Category,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Delete('/:id')
  async DeleteCategory(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteCategoryService.execute(id);
    return this.apiResponseService.successResponse(
      ['Category has been deleted successfully'],
      data,
      res,
    );
  }
}
