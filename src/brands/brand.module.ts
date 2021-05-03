import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CommonModule } from '../common/common.module';
import { BrandController } from './controller/brand.controller';
import { Brand } from './entities/brand.entity';
import { CreateBrandService } from './service/create-brand.service';
import { DeleteBrandService } from './service/delete-brand.service';
import { ListBrandService } from './service/fetch-all-brand.service';
import { FetchBrandByIdService } from './service/fetch-by-id.service';
import { UpdateBrandService } from './service/update-brand.service';
import { FetchSupplierByIdService } from '../suppliers/services/fetch-by-id.service';
import { Supplier } from '../suppliers/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Supplier]), CommonModule],
  providers: [
    CreateBrandService,
    UpdateBrandService,
    DeleteBrandService,
    FetchBrandByIdService,
    ListBrandService,
    ApiResponseService,

    FetchSupplierByIdService,
  ],
  controllers: [BrandController],
})
export class BrandModule {}
