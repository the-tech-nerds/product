import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { FetchVariancesByIdsService } from 'src/categories/service/fetch-variance-by-ids.service';
import { FetchVariancesByProductIdsService } from 'src/products/services/product/fetch-variance-by-ids.service';
import { CommonModule } from '../common/common.module';
import { DiscountController } from './controller/discount.controller';
import { Discount } from './entities/discount.entity';
import { CreateDiscountService } from './service/create-discount.service';
import { DeleteDiscountService } from './service/delete-discount.service';
import { ListDiscountService } from './service/fetch-all-discount.service';
import { FetchDiscountByIdService } from './service/fetch-by-id.service';
import { UpdateDiscountService } from './service/update-discount.service';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { ProductVariance } from '../products/entities/product-variance.entity';
import { Offer } from '../offer/entities/offer.entity';
import { AssignDiscountService } from './service/assign-discount.service';
import { ChangeDiscountStatusService } from './service/change-discount-status.service';
import { FetchActiveDiscountService } from './service/fetch-active-discount.servce';

@Module({
  // eslint-disable-next-line max-len
  imports: [
    TypeOrmModule.forFeature([
      Discount,
      Category,
      Product,
      ProductVariance,
      Offer,
    ]),
    CommonModule,
  ],
  providers: [
    ListDiscountService,
    CreateDiscountService,
    AssignDiscountService,
    FetchDiscountByIdService,
    UpdateDiscountService,
    ChangeDiscountStatusService,
    DeleteDiscountService,
    ApiResponseService,
    FetchActiveDiscountService,
    FetchVariancesByIdsService,
    FetchVariancesByProductIdsService,
  ],
  controllers: [DiscountController],
})
export class DiscountModule {}
