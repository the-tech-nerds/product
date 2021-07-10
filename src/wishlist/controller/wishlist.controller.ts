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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { FetchWishlistByUserIdService } from '../service/fetch-by-id.service';
import { CreateWishlistService } from '../service/create-wishlist.service';
import { DeleteWishlistService } from '../service/delete-wishlist.service';
import { WishlistRequest } from '../request/wishlist.request';
import { Wishlist } from '../entities/wishlist.entity';

@Controller()
export class WishlistController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createWishlistService: CreateWishlistService,
    private readonly fetchWishlistByUserIdService: FetchWishlistByUserIdService,
    private readonly deleteWishlistService: DeleteWishlistService,
  ) {}

  @UseGuards(UserGuard)
  @Post('/')
  async create(
    @CurrentUser('id') userId: any,
    @Body() wishlistRequest: WishlistRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createWishlistService.create(
      userId,
      wishlistRequest,
    );
    return this.apiResponseService.successResponse(
      ['Wishlist created successfully'],
      data as Wishlist,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/list/all')
  async gets(
    @CurrentUser('id') userId: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchWishlistByUserIdService.execute(userId);
    return this.apiResponseService.successResponse(
      ['Wishlist fetched successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Delete('/:id')
  async Delete(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteWishlistService.execute(id);
    return this.apiResponseService.successResponse(
      ['Wishlist has been deleted successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Delete('/all')
  async DeleteAll(
    @CurrentUser('id') userId: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteWishlistService.deleteAll(userId);
    return this.apiResponseService.successResponse(
      ['Wishlist has been deleted successfully'],
      data,
      res,
    );
  }
}
