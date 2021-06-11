import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@Injectable()
class ListDiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async execute(): Promise<Discount[]> {
    return this.discountRepository.find({
      deleted_at: IsNull(),
    });
  }
}

export { ListDiscountService };
