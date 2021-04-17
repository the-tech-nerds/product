import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from '../../../utils/date-time-conversion/date-time-conversion';
import { ProductVarianceRequest } from '../../requests/product-variance.request';
import { ProductVariance } from '../../entities/product-variance.entity';
import { Shop } from '../../../shops/entities/shop.entity';
import { FetchShopByIdService } from '../../../shops/service/shop/fetch-by-id.service';

@Injectable()
class UpdateProductVarianceService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
    private shopByIdsService: FetchShopByIdService,
  ) {}

  async execute(
    id: number,
    userId: number,
    productVarianceRequest: ProductVarianceRequest,
  ): Promise<ProductVariance | undefined> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { shop_ids = null } = productVarianceRequest;
    delete productVarianceRequest.shop_ids;
    await this.productVarianceRepository.update(id, {
      ...productVarianceRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    const updatedProductVariance = await this.productVarianceRepository.findOneOrFail(
      id,
    );
    let shops: Shop[] | null = null;
    if (shop_ids) {
      // @ts-ignore
      shops = await this.shopByIdsService.getMultiShops(shop_ids);
      if (!shops) {
        throw new BadRequestException('Not the valid shops');
      }
    }
    updatedProductVariance.shops = shops || [];
    return this.productVarianceRepository.save(updatedProductVariance);
  }

  async changeStatus(id: number): Promise<ProductVariance | undefined> {
    const productVariance = await this.productVarianceRepository.findOneOrFail(
      id,
    );
    productVariance.status = !productVariance.status;
    return this.productVarianceRepository.save(productVariance);
  }
}

export { UpdateProductVarianceService };
