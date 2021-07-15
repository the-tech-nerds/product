import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  UploadService,
  FileService,
} from '@the-tech-nerds/common-services';
import { FileStorage } from 'src/common/file/entities/storage.entity';
import { ProductVariance } from './entities/product-variance.entity';
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
import { FetchCategoryByIdService } from '../categories/service/fetch-category-by-id.service';
import { Category } from '../categories/entities/category.entity';
import { CommonModule } from '../common/common.module';
import { Shop } from '../shops/entities/shop.entity';
import { FetchShopByIdService } from '../shops/service/shop/fetch-by-id.service';

import { ProductDetailsService } from './services/product/product-details.service';
import { CreateMockProductsService } from './services/product/create-mock-products.service';
import { FetchProductsBySearchParamService } from './services/product/fetch-products-by-search-param.service';
import { FetchChildCategoriesService } from '../categories/service/fetch-child-categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariance, Unit, Category, Shop]),
    TypeOrmModule.forFeature([
      Product,
      ProductVariance,
      Unit,
      Category,
      FileStorage,
    ]),
    CommonModule,
  ],
  providers: [
    ApiResponseService,
    FetchShopByIdService,
    ListProductsService,
    CreateProductService,
    CreateMockProductsService,
    UpdateProductService,
    FetchProductByIdService,
    DeleteProductService,
    ProductDetailsService,

    ListProductVarianceService,
    CreateProductVarianceService,
    UpdateProductVarianceService,
    FetchProductVarianceByIdService,
    DeleteProductVarianceService,
    FetchProductsBySearchParamService,
    CreateUnitService,
    UpdateUnitService,
    ListUnitService,
    FetchUnitByIdService,
    DeleteUnitService,
    UploadService,
    FileService,

    FetchCategoryByIdService,
    FetchChildCategoriesService,
  ],
  controllers: [ProductController, ProductVarianceController, UnitController],
})
export class ProductModule {}
