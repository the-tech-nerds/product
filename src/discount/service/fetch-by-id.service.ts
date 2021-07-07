import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@Injectable()
class FetchDiscountByIdService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async execute(discountId: number): Promise<Discount | undefined> {
    return this.discountRepository.findOne(
      {
        id: discountId,
      },
      { relations: ['categories', 'products', 'productVariances', 'offers'] },
    );
  }
}
export { FetchDiscountByIdService };
