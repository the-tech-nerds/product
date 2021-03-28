import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CommonModule } from '../common/common.module';
import { InventoryController } from './controller/inventory.controller';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryService } from './service/create-inventory.service';
import { DeleteInventoryService } from './service/delete-inventory.service';
import { ListInventoryService } from './service/fetch-all-inventory.service';
import { FetchInventoryByIdService } from './service/fetch-inventory-by-id.service';
import { UpdateInventoryService } from './service/update-inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]), CommonModule],
  providers: [
    CreateInventoryService,
    UpdateInventoryService,
    DeleteInventoryService,
    FetchInventoryByIdService,
    ListInventoryService,
    ApiResponseService,
  ],
  controllers: [InventoryController],
})
export class InventoryModule {}
