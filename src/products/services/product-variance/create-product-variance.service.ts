import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileStorageService } from 'src/common/file/filte.service';
import { FileStorage } from '@the-tech-nerds/common-services/dist/upload/model/file-storage.model';
import { FetchShopByIdService } from '../../../shops/service/shop/fetch-by-id.service';
import { ProductVarianceRequest } from '../../requests/product-variance.request';
import { Shop } from '../../../shops/entities/shop.entity';

const { v4: uuidv4 } = require('uuid');

@Injectable()
class CreateProductVarianceService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
    private shopByIdsService: FetchShopByIdService,
    private fileStorageService: FileStorageService,
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

    let productImage = null;
    if (productVarianceRequest.product_id) {
      const imageList = (await this.fileStorageService.getListByEntityId(
        'product',
        productVarianceRequest.product_id,
      )) as FileStorage[];
      if (imageList.length) {
        [productImage] = imageList;
      }
    }

    let shops: Shop[] | null = null;
    if (shop_ids) {
      // @ts-ignore
      shops = await this.shopByIdsService.getMultiShops(shop_ids);
      if (!shops) {
        throw new BadRequestException('Not the valid shops');
      }
    }
    updatedProductVariance.shops = shops || [];
    if (productImage) {
      await this.fileStorageService.create([
        {
          url: productImage.url || '',
          type: 'product_variance',
          type_id: updatedProductVariance.id,
        },
      ]);
    }
    return this.productVarianceRepository.save(updatedProductVariance);
  }
}

export { CreateProductVarianceService };
