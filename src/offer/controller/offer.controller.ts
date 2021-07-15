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
import { CreateOfferService } from '../service/create-offer.service';
import { UpdateOfferService } from '../service/update-offer.service';
import { ListOfferService } from '../service/fetch-all-offer.service';
import { DeleteOfferService } from '../service/delete-offer.service';
import { FetchOfferByIdService } from '../service/fetch-by-id.service';
import { OfferRequest } from '../request/offer.request';
import { Offer } from '../entities/offer.entity';
import { ActiveOffersService } from '../service/active-offers.service';
import { OfferDetailByIdService } from '../service/offer-detail.service';

@Controller()
export class OfferController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createOfferService: CreateOfferService,
    private readonly updateOfferService: UpdateOfferService,
    private readonly fetchOfferByIdService: FetchOfferByIdService,
    private readonly listOfferService: ListOfferService,
    private readonly deleteOfferService: DeleteOfferService,
    private readonly activeOfferService: ActiveOffersService,
    private readonly offerDetailService: OfferDetailByIdService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.BRAND.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/')
  async create(
    @CurrentUser('id') userId: any,
    @Body() offerRequest: OfferRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createOfferService.create(userId, offerRequest);
    return this.apiResponseService.successResponse(
      ['Offer created successfully'],
      data as Offer,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.BRAND.GET], PermissionTypeEnum.hasPermission)
  @Get('/list/all')
  async gets(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listOfferService.execute();
    return this.apiResponseService.successResponse(
      ['Offer list fetched successfully'],
      data as Offer[],
      res,
    );
  }

  @Get('/active/all')
  async getActiveOffers(
    @Query('shop_id') shopId: string,
    @Paginate() query: PaginateQuery,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.activeOfferService.execute(query);
    console.log(data);
    return this.apiResponseService.successResponse(
      ['Offer list fetched successfully'],
      data,
      res,
    );
  }

  @Get('/detail/:slug')
  async getOfferDetail(
    @Param('slug') slug: string,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.offerDetailService.execute(slug);
    return this.apiResponseService.successResponse(
      ['Offer fetched successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.BRAND.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id')
  async update(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() offerRequest: OfferRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateOfferService.execute(
      id,
      userId,
      offerRequest,
    );
    return this.apiResponseService.successResponse(
      ['Offer has been updated successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.BRAND.GET], PermissionTypeEnum.hasPermission)
  @Get('/:id')
  async getById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchOfferByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Offer fetched successfully'],
      data as Offer,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.BRAND.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/:id')
  async Delete(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteOfferService.execute(id);
    return this.apiResponseService.successResponse(
      ['Offer has been deleted successfully'],
      data,
      res,
    );
  }
}
