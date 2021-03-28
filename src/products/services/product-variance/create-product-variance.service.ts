import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Repository } from 'typeorm';
import { ProductVarianceRequest } from '../../requests/product-variance.request';
import { LocalDateToUtc } from '../../../utils/date-time-conversion/date-time-conversion';
import { generateSku } from '../../../utils/utils';

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
    // eslint-disable-next-line max-len
    const skuRequest: SkuModel = {
      price: productVarianceRequest.price,
      productId: productVarianceRequest.product_id,
      date: LocalDateToUtc(new Date()),
    };
    productVarianceRequest.sku = generateSku(skuRequest);

    return this.productVarianceRepository.save({
      ...productVarianceRequest,
      created_by: userId,
    });
  }
}

export { CreateProductVarianceService };
