import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { IsNull, MoreThanOrEqual, Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@Injectable()
class FetchActiveDiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async execute(): Promise<Discount[]> {
    return this.discountRepository.find({
      where: {
        deleted_at: IsNull(),
        end_date: MoreThanOrEqual(LocalDateToUtc(new Date())),
        status: 1,
      },
    });
  }

  checkDiscount(products: any, discount: Discount[]) {
    return [];
  }
}

export { FetchActiveDiscountService };
