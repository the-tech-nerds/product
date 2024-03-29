import {
  ApiResponseService,
  CurrentUser,
  HasPermissions,
  PermissionTypeEnum,
  PermissionTypes,
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
import { BrandRequest } from '../request/brand.request';
import { Brand } from '../entities/brand.entity';
import { CreateBrandService } from '../service/create-brand.service';
import { DeleteBrandService } from '../service/delete-brand.service';
import { ListBrandService } from '../service/fetch-all-brand.service';
import { FetchBrandByIdService } from '../service/fetch-by-id.service';
import { UpdateBrandService } from '../service/update-brand.service';

@Controller()
export class BrandController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createBrandService: CreateBrandService,
    private readonly updateBrandService: UpdateBrandService,
    private readonly fetchBrandByIdService: FetchBrandByIdService,
    private readonly listBrandService: ListBrandService,
    private readonly deleteBrandService: DeleteBrandService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.BRAND.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/')
  async createBrand(
    @CurrentUser('id') userId: any,
    @Body() brandRequest: BrandRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createBrandService.create(userId, brandRequest);
    return this.apiResponseService.successResponse(
      ['Brand created successfully'],
      data as Brand,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.BRAND.GET], PermissionTypeEnum.hasPermission)
  @Get('/list/all')
  async getBrands(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listBrandService.execute();
    return this.apiResponseService.successResponse(
      ['Brand list fetched successfully'],
      data as Brand[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.BRAND.GET], PermissionTypeEnum.hasPermission)
  @Get('/list/all/:supplierId')
  async getBrandsBySupplierId(
    @Res() res: Response,
    @Param('supplierId') supplierId: number,
  ): Promise<Response<ResponseModel>> {
    const data = await this.listBrandService.getBrandsBySupplierId(supplierId);
    return this.apiResponseService.successResponse(
      ['Brand list fetched successfully'],
      data as Brand[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.BRAND.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id')
  async updateBrand(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() brandRequest: BrandRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateBrandService.execute(
      id,
      userId,
      brandRequest,
    );
    return this.apiResponseService.successResponse(
      ['Brand has been updated successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.BRAND.GET], PermissionTypeEnum.hasPermission)
  @Get('/:id')
  async getBrandById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchBrandByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Brand fetched successfully'],
      data as Brand,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.BRAND.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/:id')
  async DeleteBrand(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteBrandService.execute(id);
    return this.apiResponseService.successResponse(
      ['Brand has been deleted successfully'],
      data,
      res,
    );
  }
}
