import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Repository } from 'typeorm';
import { ProductVarianceRequest } from '../../requests/product-variance.request';

const { v4: uuidv4 } = require('uuid');

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
    productVarianceRequest.sku = `p-${productVarianceRequest.price}-i-${
      productVarianceRequest.product_id
    }-${uuidv4()}`;

    return this.productVarianceRepository.save({
      ...productVarianceRequest,
      created_by: userId,
    });
  }
}

export { CreateProductVarianceService };
