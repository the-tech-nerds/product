import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { FileStorage } from '../../../common/file/entities/storage.entity';
import { ProductVariance } from '../../entities/product-variance.entity';
import { Unit } from '../../entities/unit.entity';

@Injectable()
export class ProductDetailsService {
  async execute(productId: number): Promise<any | undefined> {
    const product = await getConnection()
      .createQueryBuilder()
      .select('product')
      .from(Product, 'product')
      .leftJoinAndMapMany(
        'product.files',
        FileStorage,
        'file',
        'product.id = file.type_id and file.type ="product"',
      )
      .where(`product.id =${productId}`)
      .getOne();
    const productVariance = await getConnection()
      .createQueryBuilder()
      .select('variance')
      .from(ProductVariance, 'variance')
      .leftJoinAndMapMany(
        'variance.files',
        FileStorage,
        'file',
        'variance.id = file.type_id and file.type ="product-variance"',
      )
      .leftJoinAndMapOne(
        'variance.unit',
        Unit,
        'unit',
        'variance.unit_id = unit.id',
      )
      .where(`variance.product_id =${productId}`)
      .getMany();

    const productInfo = {
      slug: product?.slug,
      name: product?.name,
      description: product?.description,
      images: product?.files.map((f: FileStorage) => f.url),
    };
    const varianceInfoes = productVariance.map((v: ProductVariance) => ({
      id: v.id,
      title: v.title,
      sku: v.sku,
      price: v.price,
      color: v.color,
      description: v.description,
      unit_value: v.unit_value,
      unit_name: v.unit.name,
      images: v.files.map((f: FileStorage) => f.url),
      inventories: v.inventories,
    }));
    return {
      productInfo,
      product_variances: varianceInfoes,
    };
  }
}
