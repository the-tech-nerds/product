import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';
import { DiscountRequest } from '../request/discount.request';

@Injectable()
class CreateDiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async create(
    userId: number,
    discountRequest: DiscountRequest,
  ): Promise<Discount> {
    if (!discountRequest.discount_amount)
      discountRequest.discount_amount = undefined;

    if (!discountRequest.discount_percentage)
      discountRequest.discount_percentage = undefined;

    return this.discountRepository.save({
      ...discountRequest,
      created_by: userId,
    });
  }
}

export { CreateDiscountService };
