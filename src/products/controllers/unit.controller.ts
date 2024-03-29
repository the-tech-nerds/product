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
import { CreateUnitService } from '../services/unit/create-unit.service';
import { UpdateUnitService } from '../services/unit/update-unit.service';
import { FetchUnitByIdService } from '../services/unit/fetch-by-id.service';
import { Unit } from '../entities/unit.entity';
import { DeleteUnitService } from '../services/unit/delete.service';
import { ListUnitService } from '../services/unit/fetch-all.service';
import { UnitRequest } from '../requests/unit.request';

@Controller()
class UnitController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createUnitService: CreateUnitService,
    private readonly updateUnitService: UpdateUnitService,
    private readonly fetchUnitByIdService: FetchUnitByIdService,
    private readonly listUnitService: ListUnitService,
    private readonly deleteUnitService: DeleteUnitService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.UNIT.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/unit')
  async createUnit(
    @CurrentUser('id') userId: any,
    @Body() unitRequest: UnitRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createUnitService.create(userId, unitRequest);
    return this.apiResponseService.successResponse(
      ['Unit created successfully'],
      data as Unit,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.UNIT.GET], PermissionTypeEnum.hasPermission)
  @Get('/unit/list/all')
  async getUnits(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listUnitService.execute();
    return this.apiResponseService.successResponse(
      ['Unit list fetched successfully'],
      data as Unit[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.UNIT.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/unit/:id')
  async updateUnit(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() unitRequest: UnitRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateUnitService.execute(id, userId, unitRequest);
    return this.apiResponseService.successResponse(
      ['Unit has been updated successfully'],
      data as Unit,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.UNIT.GET], PermissionTypeEnum.hasPermission)
  @Get('/unit/:id')
  async getUnitById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchUnitByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Unit fetched successfully'],
      data as Unit,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.UNIT.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/unit/:id')
  async DeleteUnit(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteUnitService.execute(id);
    return this.apiResponseService.successResponse(
      ['Unit has been deleted successfully'],
      data,
      res,
    );
  }
}

export { UnitController };
