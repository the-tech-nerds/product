import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
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
@Module({
  imports: [TypeOrmModule.forFeature([Product, Unit])],
  providers: [
    ListProductsService,
    ApiResponseService,
    CreateUnitService,
    UpdateUnitService,
    ListUnitService,
    FetchUnitByIdService,
    DeleteUnitService,
  ],
  controllers: [ProductController, UnitController],
})
export class ProductModule {}
