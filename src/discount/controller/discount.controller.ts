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
import { CreateDiscountService } from '../service/create-discount.service';
import { UpdateDiscountService } from '../service/update-discount.service';
import { ListDiscountService } from '../service/fetch-all-discount.service';
import { DeleteDiscountService } from '../service/delete-discount.service';
import { FetchDiscountByIdService } from '../service/fetch-by-id.service';
import { DiscountRequest } from '../request/discount.request';
import { Discount } from '../entities/discount.entity';
import { DiscountAssignRequest } from '../request/discount-assign.request';
import { AssignDiscountService } from '../service/assign-discount.service';
import { ChangeDiscountStatusService } from '../service/change-discount-status.service';

@Controller()
export class DiscountController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createDiscountService: CreateDiscountService,
    private readonly assignDiscountService: AssignDiscountService,
    private readonly updateDiscountService: UpdateDiscountService,
    private readonly fetchDiscountByIdService: FetchDiscountByIdService,
    private readonly listDiscountService: ListDiscountService,
    private readonly changeDiscountStatusService: ChangeDiscountStatusService,
    private readonly deleteDiscountService: DeleteDiscountService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.BRAND.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/')
  async create(
    @CurrentUser('id') userId: any,
    @Body() discountRequest: DiscountRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createDiscountService.create(
      userId,
      discountRequest,
    );
    return this.apiResponseService.successResponse(
      ['Discount created successfully'],
      data as Discount,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.DISCOUNT.ASSIGN],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/assign')
  async assignDiscount(
    @CurrentUser('id') userId: any,
    @Body() discountAssignRequest: DiscountAssignRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.assignDiscountService.execute(
      userId,
      discountAssignRequest,
    );
    return this.apiResponseService.successResponse(
      ['Discount created successfully'],
      data as Discount,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.DISCOUNT.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/all')
  async gets(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listDiscountService.execute();
    return this.apiResponseService.successResponse(
      ['Discount list fetched successfully'],
      data as Discount[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.DISCOUNT.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id')
  async update(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() discountRequest: DiscountRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateDiscountService.execute(
      id,
      userId,
      discountRequest,
    );
    return this.apiResponseService.successResponse(
      ['Discount has been updated successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.DISCOUNT.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/:id')
  async getById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchDiscountByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Discount fetched successfully'],
      data as Discount,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.DISCOUNT.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id/status')
  async changeDiscountStatus(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.changeDiscountStatusService.execute(id);
    return this.apiResponseService.successResponse(
      ['Discount status updated successfully'],
      data as Discount,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.DISCOUNT.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/:id')
  async Delete(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteDiscountService.execute(id);
    return this.apiResponseService.successResponse(
      ['Discount has been deleted successfully'],
      data,
      res,
    );
  }
}
