import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { BrandController } from './controller/brand.controller';
import { Brand } from './entities/brand.entity';
import { CreateBrandService } from './service/create-brand.service';
import { DeleteBrandService } from './service/delete-brand.service';
import { ListBrandService } from './service/fetch-all-brand.service';
import { FetchBrandByIdService } from './service/fetch-by-id.service';
import { UpdateBrandService } from './service/update-brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [
    CreateBrandService,
    UpdateBrandService,
    DeleteBrandService,
    FetchBrandByIdService,
    ListBrandService,
    ApiResponseService,
  ],
  controllers: [BrandController],
})
export class BrandModule {}
