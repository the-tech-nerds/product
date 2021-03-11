import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiResponseService,
  CurrentUser,
  HasPermissions,
  PermissionTypeEnum,
  PermissionTypes,
  UserGuard,
} from '@the-tech-nerds/common-services';
import { Product } from '../entities/product.entity';
import { ProductRequest } from '../requests/product.request';
import { ListProductsService } from '../services/product/list-products.service';
// import { CreateProductService } from '../services/product/create-product.service';
import { UpdateProductService } from '../services/product/update-product.service';
import { FetchProductByIdService } from '../services/product/fetch-product-by-id.service';
import { DeleteProductService } from '../services/product/delete-product.service';

@Controller()
export class ProductController {
  constructor(
    private readonly listProductsService: ListProductsService,
    private readonly apiResponseService: ApiResponseService,
    // private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly fetchProductByIdService: FetchProductByIdService,
    private readonly deleteProductService: DeleteProductService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  // @Post('/')
  // async createProduct(
  //   @CurrentUser('id') userId: any,
  //   @Body() productRequest: ProductRequest,
  //   @Res() res: Response,
  // ): Promise<Response<ResponseModel>> {
  //   const data = await this.createProductService.create(userId, productRequest);
  //   return this.apiResponseService.successResponse(
  //     ['Product created successfully'],
  //     data as Product,
  //     res,
  //   );
  // }

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
    const data = await this.updateProductService.execute(
      id,
      userId,
      productRequest,
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
  async DeleteProduct(
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
