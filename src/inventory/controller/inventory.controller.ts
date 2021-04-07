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
import { InventoryRequest } from '../request/inventory.request';
import { Inventory } from '../entities/inventory.entity';
import { CreateInventoryService } from '../service/create-inventory.service';
import { DeleteInventoryService } from '../service/delete-inventory.service';
import { ListInventoryService } from '../service/fetch-all-inventory.service';
import { FetchInventoryByIdService } from '../service/fetch-inventory-by-id.service';
import { UpdateInventoryService } from '../service/update-inventory.service';

@Controller()
export class InventoryController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createInventoryService: CreateInventoryService,
    private readonly updateInventoryService: UpdateInventoryService,
    private readonly fetchInventoryByIdService: FetchInventoryByIdService,
    private readonly listInventoryService: ListInventoryService,
    private readonly deleteInventoryService: DeleteInventoryService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.INVENTORY.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/')
  async createInventory(
    @CurrentUser('id') userId: any,
    @Body() inventoryRequest: InventoryRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createInventoryService.create(
      userId,
      inventoryRequest,
    );
    return this.apiResponseService.successResponse(
      ['Inventory created successfully'],
      data as Inventory,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.INVENTORY.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/')
  async getInventories(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listInventoryService.execute();
    return this.apiResponseService.successResponse(
      ['Inventory list fetched successfully'],
      data as Inventory[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.INVENTORY.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id')
  async updateInventory(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() inventoryRequest: InventoryRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateInventoryService.execute(
      id,
      userId,
      inventoryRequest,
    );
    return this.apiResponseService.successResponse(
      ['Inventory has been updated successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.INVENTORY.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id/status')
  async changeInventoryStatus(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateInventoryService.changeStatus(id);
    return this.apiResponseService.successResponse(
      ['Inventory status updated successfully'],
      data as Inventory,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.INVENTORY.GET],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/:id')
  async getInventoryById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchInventoryByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Inventory fetched successfully'],
      data as Inventory,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.INVENTORY.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/:id')
  async DeleteInventory(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteInventoryService.execute(id);
    return this.apiResponseService.successResponse(
      ['Inventory has been deleted successfully'],
      data,
      res,
    );
  }
}
