import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariance } from '../../entities/product-variance.entity';

@Injectable()
export class ListProductVarianceService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
  ) {}

  async execute(): Promise<ProductVariance[]> {
    return this.productVarianceRepository.find();
  }
}
