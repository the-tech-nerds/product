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

  async execute(brandId: number): Promise<Discount | undefined> {
    const item = await this.discountRepository.findOne({
      id: brandId,
    });
    return item;
  }
}
export { FetchDiscountByIdService };
