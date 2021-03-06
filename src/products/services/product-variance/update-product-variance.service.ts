import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from '../../../utils/date-time-conversion/date-time-conversion';
import { ProductVarianceRequest } from '../../requests/product-variance.request';
import { ProductVariance } from '../../entities/product-variance.entity';

@Injectable()
class UpdateProductVarianceService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
  ) {}

  async execute(
    id: number,
    userId: number,
    productVarianceRequest: ProductVarianceRequest,
  ): Promise<ProductVariance | undefined> {
    await this.productVarianceRepository.update(id, {
      ...productVarianceRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.productVarianceRepository.findOne(id);
  }
}

export { UpdateProductVarianceService };
