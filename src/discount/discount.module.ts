import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
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
    CreateDiscountService,
    DeleteDiscountService,
    FetchDiscountByIdService,
    UpdateDiscountService,
    ListDiscountService,
    ApiResponseService,
  ],
  controllers: [DiscountController],
})
export class DiscountModule {}
