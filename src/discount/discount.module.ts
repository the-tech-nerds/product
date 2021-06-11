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

@Module({
  imports: [TypeOrmModule.forFeature([Discount]), CommonModule],
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
