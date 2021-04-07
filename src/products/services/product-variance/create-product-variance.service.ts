import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVarianceRequest } from '../../requests/product-variance.request';
import { Shop } from '../../../shops/entities/shop.entity';

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
  ): Promise<ProductVariance | null> {
    productVarianceRequest.sku = `p-${productVarianceRequest.price}-i-${
      productVarianceRequest.product_id
    }-${uuidv4()}`;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { shop_ids = null } = productVarianceRequest;
    const updatedProductVariance = await this.productVarianceRepository.save({
      ...productVarianceRequest,
      created_by: userId,
    });

    let shops: Shop[] | null = null;
    if (shop_ids) {
      // @ts-ignore
      shops = await this.shopByIdsService.findByIds(shop_ids);
      if (!shops) {
        throw new BadRequestException('Not the valid shops');
      }
    }
    updatedProductVariance.shops = shops || [];
    return this.productVarianceRepository.save(updatedProductVariance);
  }
}

export { CreateProductVarianceService };
