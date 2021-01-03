import {
  ApiResponseService,
  CurrentUser,
  UserGuard,
} from '@technerds/common-services';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateShopService } from '../services/shop/create-shop.service';
import { ShopRequest } from '../requests/shop/shop.request';
import { Shop } from '../entities/shop.entity';

@Controller()
export class ShopController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createShopService: CreateShopService,
  ) {}

  @UseGuards(UserGuard)
  @Post('/')
  async getProducts(
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
}
