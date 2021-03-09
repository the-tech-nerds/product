import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  UploadService,
  SaveFileService,
} from '@the-tech-nerds/common-services';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ListProductsService } from './services/list-products.service';
import { Unit } from './entities/unit.entity';
import { CreateUnitService } from './services/unit/create-unit.service';
import { UpdateUnitService } from './services/unit/update-unit.service';
import { ListUnitService } from './services/unit/fetch-all.service';
import { FetchUnitByIdService } from './services/unit/fetch-by-id.service';
import { DeleteUnitService } from './services/unit/delete.service';
import { UnitController } from './controllers/unit.controller';
import { FileController } from './controllers/file.controller';
import { FileStorage } from './entities/storage.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Unit, FileStorage])],
  providers: [
    ListProductsService,
    ApiResponseService,
    CreateUnitService,
    UpdateUnitService,
    ListUnitService,
    FetchUnitByIdService,
    DeleteUnitService,
    UploadService,
    SaveFileService,
  ],
  controllers: [ProductController, UnitController, FileController],
})
export class ProductModule {}
