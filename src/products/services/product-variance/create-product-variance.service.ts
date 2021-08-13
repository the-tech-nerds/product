import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileStorageService } from 'src/common/file/filte.service';
import { FileStorage } from '@the-tech-nerds/common-services/dist/upload/model/file-storage.model';
import { Category } from 'src/categories/entities/category.entity';
import { FetchShopByIdService } from '../../../shops/service/shop/fetch-by-id.service';
import { ProductVarianceRequest } from '../../requests/product-variance.request';
import { Shop } from '../../../shops/entities/shop.entity';
import { FetchProductByIdService } from '../product/fetch-product-by-id.service';

const { v4: uuidv4 } = require('uuid');

@Injectable()
class CreateProductVarianceService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
    private shopByIdsService: FetchShopByIdService,
    private fileStorageService: FileStorageService,
    private fetchProductByIdService: FetchProductByIdService,
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
    const prod = await this.fetchProductByIdService.execute(
      productVarianceRequest.product_id,
    );
    if (prod?.product?.discount_id > 0) {
      productVarianceRequest.discount_id = prod.product.discount_id;
    } else {
      const categoris: Category[] = prod?.product?.categories || [];
      const cDiscountIds =
        categoris
          .map((c: Category) => c.discount_id)
          ?.filter(
            (v: any, i: any, a: any) => v !== null && a.indexOf(v) === i,
          ) || [];
      if (cDiscountIds.length > 0) {
        productVarianceRequest.discount_id = Number(cDiscountIds[0]);
      }
    }
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
