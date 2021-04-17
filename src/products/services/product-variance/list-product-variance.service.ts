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

  async execute(productId: number): Promise<ProductVariance[]> {
    return this.productVarianceRepository.find({
      where: { product_id: productId },
      relations: ['product', 'unit', 'shops'],
    });
  }
}
