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
import { CreateShopService } from '../service/shop/create-shop.service';
import { ShopRequest } from '../request/shop.request';
import { Shop } from '../entities/shop.entity';
import { UpdateShopService } from '../service/shop/update-shop.service';
import { FetchShopByIdService } from '../service/shop/fetch-by-id.service';
import { ListShopService } from '../service/shop/fetch-all.service';
import { DeleteShopService } from '../service/shop/delete.service';

@Controller()
export class ShopController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createShopService: CreateShopService,
    private readonly updateShopService: UpdateShopService,
    private readonly fetchShopByIdService: FetchShopByIdService,
    private readonly listShopService: ListShopService,
    private readonly deleteShopService: DeleteShopService,
  ) {}

  @UseGuards(UserGuard)
  @Post('/')
  async createShop(
    @CurrentUser('id') userId: any,
    @Body() shopRequest: ShopRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.createShopService.create(userId, shopRequest);
      return this.apiResponseService.successResponse(
        ['shop created successfully'],
        data as Shop,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @Get('/all')
  async getShops(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listShopService.execute();
      return this.apiResponseService.successResponse(
        ['Shop list fetched successfully'],
        data as Shop[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @Put('/:id')
  async updateShop(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() shopRequest: ShopRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updateShopService.execute(
        id,
        userId,
        shopRequest,
      );
      return this.apiResponseService.successResponse(
        ['Shop has been updated successfully'],
        data as Shop,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @Get('/:id')
  async getShopById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.fetchShopByIdService.execute(id);
      return this.apiResponseService.successResponse(
        ['Shop fetched successfully'],
        data as Shop,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @Delete('/:id')
  async DeleteShop(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.deleteShopService.execute(id);
      return this.apiResponseService.successResponse(
        ['Shop has been deleted successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }
}
