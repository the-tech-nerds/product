import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Repository } from 'typeorm';
import { ProductVarianceRequest } from '../../requests/product-variance.request';

@Injectable()
class CreateProductVarianceService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
  ) {}

  async create(
    userId: number,
    productVarianceRequest: ProductVarianceRequest,
  ): Promise<ProductVariance> {
    return this.productVarianceRepository.save({
      ...productVarianceRequest,
      created_by: userId,
    });
  }
}

export { CreateProductVarianceService };
