import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@Injectable()
export class ChangeDiscountStatusService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async execute(id: number): Promise<Discount | undefined | void> {
    const discount = await this.discountRepository.findOneOrFail(id);
    discount.status = discount.status ? 1 : 0;
    return this.discountRepository.save(discount);
  }
}
