import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariance } from '../../entities/product-variance.entity';

@Injectable()
class DeleteProductVarianceService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
  ) {}

  async execute(id: number): Promise<any> {
    return this.productVarianceRepository.softDelete(id);
  }
}

export { DeleteProductVarianceService };
