import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  EventsModule,
} from '@the-tech-nerds/common-services';
import { CommonModule } from '../common/common.module';
import { InventoryController } from './controller/inventory.controller';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryService } from './service/create-inventory.service';
import { DeleteInventoryService } from './service/delete-inventory.service';
import { ListInventoryService } from './service/fetch-all-inventory.service';
import { FetchInventoryByIdService } from './service/fetch-inventory-by-id.service';
import { UpdateInventoryService } from './service/update-inventory.service';
import { FetchShopByIdService } from '../shops/service/shop/fetch-by-id.service';
import { Shop } from '../shops/entities/shop.entity';
import { InventoryRequest } from './request/inventory.request';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Shop]), CommonModule],
  providers: [
    CreateInventoryService,
    UpdateInventoryService,
    DeleteInventoryService,
    FetchInventoryByIdService,
    ListInventoryService,

    FetchShopByIdService,

    ApiResponseService,
    EventsModule,

    InventoryRequest,
  ],
  controllers: [InventoryController],
})
export class InventoryModule {}
