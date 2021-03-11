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
  PermissionTypeEnum,
  PermissionTypes,
  UserGuard,
} from '@the-tech-nerds/common-services';
import { ProductVariance } from '../entities/product-variance.entity';
import { ListProductVarianceService } from '../services/product-variance/list-product-variance.service';
import { CreateProductVarianceService } from '../services/product-variance/create-product-variance.service';
import { UpdateProductVarianceService } from '../services/product-variance/update-product-variance.service';
import { FetchProductVarianceByIdService } from '../services/product-variance/fetch-product-variance-by-id.service';
import { DeleteProductVarianceService } from '../services/product-variance/delete-product-variance.service';
import { ProductVarianceRequest } from '../requests/product-variance.request';

@Controller()
export class ProductVarianceController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly listProductVarianceService: ListProductVarianceService,
    private readonly createProductVarianceService: CreateProductVarianceService,
    private readonly updateProductVarianceService: UpdateProductVarianceService,
    private readonly fetchProductVarianceByIdService: FetchProductVarianceByIdService,
    private readonly deleteProductVarianceService: DeleteProductVarianceService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/')
  async createProductVariance(
    @CurrentUser('id') userId: any,
      @Body() productVarianceRequest: ProductVarianceRequest,
      @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createProductVarianceService.create(
      userId,
      productVarianceRequest,
    );
    return this.apiResponseService.successResponse(
      ['Product variance created successfully'],
      data as ProductVariance,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/')
  async getProductVarianceList(
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listProductVarianceService.execute();
      return this.apiResponseService.successResponse(
        ['Product variance list fetched successfully'],
        data as ProductVariance[],
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
  async updateProductVariance(
    @CurrentUser('id') userId: any,
      @Param('id') id: number,
      @Body() productVarianceRequest: ProductVarianceRequest,
      @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateProductVarianceService.execute(
      id,
      userId,
      productVarianceRequest,
    );
    return this.apiResponseService.successResponse(
      ['Product variance has been updated successfully'],
      data as ProductVariance,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.PRODUCT.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/:id')
  async getProductVarianceById(
    @Param('id') id: number,
      @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchProductVarianceByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Product variance fetched successfully'],
      data as ProductVariance,
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
    const data = await this.deleteProductVarianceService.execute(id);
    return this.apiResponseService.successResponse(
      ['Product variance has been deleted successfully'],
      data,
      res,
    );
  }
}
