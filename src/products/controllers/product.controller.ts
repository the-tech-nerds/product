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
import {
  ApiResponseService,
  CurrentUser,
  HasPermissions,
  Paginate,
  PaginateQuery,
  PermissionTypeEnum,
  PermissionTypes,
  UserGuard,
} from '@the-tech-nerds/common-services';
import { Product } from '../entities/product.entity';
import { ProductRequest } from '../requests/product.request';
import { ListProductsService } from '../services/product/list-products.service';
import { CreateProductService } from '../services/product/create-product.service';
import { CreateMockProductsService } from '../services/product/create-mock-products.service';
import { UpdateProductService } from '../services/product/update-product.service';
import { FetchProductByIdService } from '../services/product/fetch-product-by-id.service';
import { DeleteProductService } from '../services/product/delete-product.service';
import { ProductDetailsService } from '../services/product/product-details.service';
import { FetchProductsBySearchParamService } from '../services/product/fetch-products-by-search-param.service';

@Controller()
export class ProductController {
  constructor(
    private readonly listProductsService: ListProductsService,
    private readonly apiResponseService: ApiResponseService,
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly fetchProductByIdService: FetchProductByIdService,
    private readonly deleteProductService: DeleteProductService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly createMockProductService: CreateMockProductsService,
    private readonly fetchProductsBySearchParam: FetchProductsBySearchParamService,
  ) {}

  @Get('/search')
  async getProductsByCategorySlug(
    @Paginate() paginateQuery: PaginateQuery,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    console.log('paginateQuery', paginateQuery);
    paginateQuery.search = paginateQuery.search?.split(',')[0];
    console.log('paginateQuery', paginateQuery);
    const data = await this.fetchProductsBySearchParam.execute(paginateQuery);
    return this.apiResponseService.successResponse(
      ['Products fetched successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/')
  async createProduct(
    @CurrentUser('id') userId: any,
    @Body() productRequest: ProductRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createProductService.create(userId, productRequest);
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      data as Product,
      res,
    );
  }

  @Post('/mock')
  async createMockProducts(
    @CurrentUser('id') userId: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    await this.createMockProductService.create();
    return this.apiResponseService.successResponse(
      ['Product created successfully'],
      null,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/')
  async getProducts(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listProductsService.execute();
      return this.apiResponseService.successResponse(
        ['Product list fetched successfully'],
        data as Product[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/category/:categoryId')
  async getProductsFromCategory(
    @Res() res: Response,
    @Param('categoryId') categoryId: number,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listProductsService.getProductsFromCategory(
        categoryId,
      );
      return this.apiResponseService.successResponse(
        ['Product list fetched successfully'],
        data as Product[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id')
  async updateProduct(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() productRequest: ProductRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const categoryIds = productRequest.category_ids;
    delete productRequest.category_ids;
    const data = await this.updateProductService.execute(
      id,
      userId,
      productRequest,
      categoryIds,
    );
    return this.apiResponseService.successResponse(
      ['Product has been updated successfully'],
      data as Product,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/:id')
  async getProductById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchProductByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Product fetched successfully'],
      data,
      res,
    );
  }

  @Get('/public/:slug')
  async getPublicProductById(
    @Param('slug') slug: string,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.productDetailsService.execute(slug);
    return this.apiResponseService.successResponse(
      ['Product fetched successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id/status')
  async changeProductStatus(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateProductService.changeStatus(id);
    return this.apiResponseService.successResponse(
      ['Product status updated successfully'],
      data as Product,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/:id')
  async deleteProduct(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteProductService.execute(id);
    return this.apiResponseService.successResponse(
      ['Product has been deleted successfully'],
      data,
      res,
    );
  }
}
