import { Injectable } from '@nestjs/common';
import { getConnection, getManager, MoreThan } from 'typeorm';
import { InventoryVariance } from 'src/products/view/inventory-variance.view';
import { Discount } from 'src/discount/entities/discount.entity';
import { Product } from '../../entities/product.entity';
import { FileStorage } from '../../../common/file/entities/storage.entity';
import { ProductVariance } from '../../entities/product-variance.entity';
import { Unit } from '../../entities/unit.entity';

@Injectable()
export class ProductDetailsService {
  async execute(slug: string): Promise<any | undefined> {
    const product = await getConnection()
      .createQueryBuilder()
      .select('product')
      .from(Product, 'product')
      .leftJoinAndMapMany(
        'product.images',
        FileStorage,
        'file',
        'product.id = file.type_id and file.type ="product"',
      )
      .leftJoinAndMapOne(
        'product.discount',
        Discount,
        'dist',
        'product.discount_id = dist.id',
      )
      .where(`product.slug ='${slug}'`)
      .getOne();
    const inventoryVariances =
      (await getManager().find(InventoryVariance, {
        product_id: product?.id,
        stock_count: MoreThan(0),
      })) || [];
    // count total stock
    // let stock = 0;
    // inventoryVariances.forEach(element => {
    //   if (element.stock_count) {
    //     stock += element.stock_count;
    //   }
    // });

    const productVariance = await getConnection()
      .createQueryBuilder()
      .select('variance')
      .from(ProductVariance, 'variance')
      .leftJoinAndMapMany(
        'variance.images',
        FileStorage,
        'file',
        'variance.id = file.type_id and file.type ="product-variance"',
      )
      .leftJoinAndMapOne(
        'variance.discount',
        Discount,
        'dist',
        'variance.discount_id = dist.id',
      )
      .leftJoinAndMapOne(
        'variance.unit',
        Unit,
        'unit',
        'variance.unit_id = unit.id',
      )
      .where(`variance.product_id =${product?.id}`)
      .getMany();

    const productInfo = {
      slug: product?.slug,
      name: product?.name,
      Discount: product?.discount,
      description: product?.description,
      images: product?.images.map((f: FileStorage) => f.url),
    };
    const varianceInfoes = productVariance.map((v: ProductVariance) => ({
      id: v.id,
      title: v.title,
      sku: v.sku,
      product_id: v.product_id,
      price: v.price,
      discount: v.discount,
      color: v.color,
      description: v.description,
      unit_value: v.unit_value,
      unit_name: v.unit.name,
      stock_count: this.sumOfStock(inventoryVariances, v.id),
      images: v.images.map((f: FileStorage) => f.url),
    }));
    return {
      productInfo,
      product_variances: varianceInfoes,
    };
  }

  sumOfStock = (list: InventoryVariance[], id: number) => {
    let total = 0;
    list.forEach(l => {
      if (l.id === id) {
        total += l.stock_count;
      }
    });
    return total;
  };
}
