import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@Injectable()
class DeleteDiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.discountRepository.softDelete(id);
  }
}

export { DeleteDiscountService };
