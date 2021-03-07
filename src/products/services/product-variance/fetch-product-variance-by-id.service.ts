import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariance } from '../../entities/product-variance.entity';

@Injectable()
export class FetchProductVarianceByIdService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
  ) {}

  async execute(productId: number): Promise<ProductVariance | undefined> {
    return this.productVarianceRepository.findOne({
      id: productId,
    });
  }
}
