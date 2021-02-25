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
  @Post('/')
  async createBrand(
    @CurrentUser('id') userId: any,
    @Body() brandRequest: BrandRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    userId = 1;
    const data = await this.createBrandService.create(userId, brandRequest);
    return this.apiResponseService.successResponse(
      ['Brand created successfully'],
      data as Brand,
      res,
    );
  }

  @UseGuards(UserGuard)
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
      data as Brand,
      res,
    );
  }

  @UseGuards(UserGuard)
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
