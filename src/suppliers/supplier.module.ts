import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { SupplierController } from './controllers/supplier.controller';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierService } from './services/create-supplierservice';
import { DeleteSupplierService } from './services/delete.service';
import { ListSupplierService } from './services/fetch-all.service';
import { FetchSupplierByIdService } from './services/fetch-by-id.service';
import { UpdateSupplierService } from './services/update-supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [
    CreateSupplierService,
    UpdateSupplierService,
    DeleteSupplierService,
    FetchSupplierByIdService,
    ListSupplierService,
    ApiResponseService,
  ],
  controllers: [SupplierController],
})
export class SupplierModule {}
