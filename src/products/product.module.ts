import { ProductVariance } from './entities/product-variance.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  UploadService,
  FileService,
} from '@the-tech-nerds/common-services';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ListProductsService } from './services/product/list-products.service';
import { Unit } from './entities/unit.entity';
import { CreateUnitService } from './services/unit/create-unit.service';
import { UpdateUnitService } from './services/unit/update-unit.service';
import { ListUnitService } from './services/unit/fetch-all.service';
import { FetchUnitByIdService } from './services/unit/fetch-by-id.service';
import { DeleteUnitService } from './services/unit/delete.service';
import { UnitController } from './controllers/unit.controller';
import { CreateProductService } from './services/product/create-product.service';
import { UpdateProductService } from './services/product/update-product.service';
import { DeleteProductService } from './services/product/delete-product.service';
import { FetchProductByIdService } from './services/product/fetch-product-by-id.service';
import { ListProductVarianceService } from './services/product-variance/list-product-variance.service';
import { CreateProductVarianceService } from './services/product-variance/create-product-variance.service';
import { FetchProductVarianceByIdService } from './services/product-variance/fetch-product-variance-by-id.service';
import { DeleteProductVarianceService } from './services/product-variance/delete-product-variance.service';
import { UpdateProductVarianceService } from './services/product-variance/update-product-variance.service';
import { ProductVarianceController } from './controllers/product-variance.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Unit, ProductVariance])],
  providers: [
    ApiResponseService,

    ListProductsService,
    CreateProductService,
    UpdateProductService,
    FetchProductByIdService,
    DeleteProductService,

    ListProductVarianceService,
    CreateProductVarianceService,
    UpdateProductVarianceService,
    FetchProductVarianceByIdService,
    DeleteProductVarianceService,

    CreateUnitService,
    UpdateUnitService,
    ListUnitService,
    FetchUnitByIdService,
    DeleteUnitService,
    UploadService,
    FileService,
  ],
  controllers: [ProductController, ProductVarianceController, UnitController],
})
export class ProductModule {}
