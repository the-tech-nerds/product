import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Discount } from '../entities/discount.entity';
import { DiscountRequest } from '../request/discount.request';

@Injectable()
class UpdateDiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async execute(
    id: number,
    userId: number,
    discountRequest: DiscountRequest,
  ): Promise<Discount | undefined> {
    await this.discountRepository.update(id, {
      ...discountRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.discountRepository.findOne(id);
  }
}
export { UpdateDiscountService };
