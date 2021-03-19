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
import { UpdateSupplierService } from '../services/update-supplier.service';
import { CreateSupplierService } from '../services/create-supplierservice';
import { Supplier } from '../entities/supplier.entity';
import { DeleteSupplierService } from '../services/delete.service';
import { ListSupplierService } from '../services/fetch-all.service';
import { FetchSupplierByIdService } from '../services/fetch-by-id.service';
import { SupplierRequest } from '../requests/supplier.request';

@Controller()
export class SupplierController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createSupplierService: CreateSupplierService,
    private readonly updateSupplierService: UpdateSupplierService,
    private readonly fetchSupplierByIdService: FetchSupplierByIdService,
    private readonly listSupplierService: ListSupplierService,
    private readonly deleteSupplierService: DeleteSupplierService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.SUPPLIER.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/')
  async createSupplier(
    @CurrentUser('id') userId: any,
    @Body() supplierRequest: SupplierRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createSupplierService.create(
      userId,
      supplierRequest,
    );
    return this.apiResponseService.successResponse(
      ['Supplier created successfully'],
      data as Supplier,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.SUPPLIER.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/list/all')
  async getSuppliers(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listSupplierService.execute();
    return this.apiResponseService.successResponse(
      ['Supplier list fetched successfully'],
      data as Supplier[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.SUPPLIER.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id')
  async updateSupplier(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() supplierRequest: SupplierRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateSupplierService.execute(
      id,
      userId,
      supplierRequest,
    );
    return this.apiResponseService.successResponse(
      ['Supplier has been updated successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.SUPPLIER.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/:id')
  async getSupplierById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchSupplierByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Supplier fetched successfully'],
      data as Supplier,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.SUPPLIER.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/:id')
  async DeleteSupplier(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteSupplierService.execute(id);
    return this.apiResponseService.successResponse(
      ['Supplier has been deleted successfully'],
      data,
      res,
    );
  }
}
