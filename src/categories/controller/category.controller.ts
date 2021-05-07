import {
  ApiResponseService,
  CurrentUser,
  UserGuard,
  Paginate,
  PaginateQuery,
} from '@the-tech-nerds/common-services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { MenuCategoryService } from '../service/menu-category';
import { FetchCategoryBySlugService } from '../service/fetch-category-by-slug.service';
import { FetchCategoryByShopService } from '../service/fetch-category-by-shop.service';
import { FetchProductsByCategorySlugService } from '../service/fetch-products-by-category-slug.service';

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
    private readonly menuCategoryService: MenuCategoryService,
    private readonly fetchCategoryBySlugService: FetchCategoryBySlugService,
    private readonly fetchProductsByCategorySlugService: FetchProductsByCategorySlugService,
    private readonly fetchCategoryByShopService: FetchCategoryByShopService,
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
      data,
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

  @Get('/:slug/products')
  async getProductsByCategorySlug(
    @Param('slug') slug: string,
    @Query('shop_id') shopId: string,
    @Paginate() query: PaginateQuery,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchProductsByCategorySlugService.execute(
      slug,
      shopId,
      query,
    );
    return this.apiResponseService.successResponse(
      ['Products fetched successfully'],
      data,
      res,
    );
  }

  @Get('/slug/:slug')
  async getCategoryBySlug(
    @Param('slug') slug: string,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchCategoryBySlugService.execute(slug);
    return this.apiResponseService.successResponse(
      ['Category fetched successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/shop/:shopId')
  async getCategoryByShop(
    @Param('shopId') shopId: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchCategoryByShopService.execute(shopId);
    return this.apiResponseService.successResponse(
      ['Category fetched successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/:id/status')
  async changeCategoryStatus(
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
  async deleteCategory(
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

  @Get('/menu/all')
  async GetCategoryMenu(
    @Res() res: Response,
    @Query('shop_type_id') shopTypeId: string,
  ): Promise<Response<ResponseModel>> {
    const data = await this.menuCategoryService.execute(shopTypeId);
    return this.apiResponseService.successResponse(
      ['Category menu has been fetched successfully'],
      data,
      res,
    );
  }
}
