import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { InventoryVariance } from 'src/products/view/inventory-variance.view';
import { VwProductVariance } from 'src/products/view/vw_product_variance.view';
import { FileStorage } from 'src/common/file/entities/storage.entity';
import { Wishlist } from '../entities/wishlist.entity';

@Injectable()
class FetchWishlistByUserIdService {
  async execute(userId: number): Promise<any | undefined> {
    const wishlists: Wishlist[] = await getConnection()
      .createQueryBuilder()
      .select('wishlist')
      .from(Wishlist, 'wishlist')
      .leftJoinAndMapOne(
        'wishlist.vwProductVariance',
        VwProductVariance,
        'variance',
        'variance.id = wishlist.product_variance_Id',
      )
      .leftJoinAndMapMany(
        'wishlist.inventoryVariance',
        InventoryVariance,
        'inVariance',
        'inVariance.id = wishlist.product_variance_Id',
      )
      .leftJoinAndMapMany(
        'wishlist.images',
        FileStorage,
        'file',
        'wishlist.product_id = file.type_id and file.type ="product"',
      )
      .where(`wishlist.created_by =${userId}`)
      .getMany();

    const list = wishlists.map(x => {
      let item = {};
      let stock = 0;
      x.inventoryVariance.forEach(element => {
        if (element.stock_count) {
          stock += element.stock_count;
        }
      });
      item = {
        id: x.id,
        product_id: x.product_id,
        variance_id: x.product_variance_Id,
        stock_count: stock,
        variance_price: x.vwProductVariance.variance_price,
        unit_value: x.vwProductVariance.unit_value,
        unit_name: x.vwProductVariance.unit_name,
        product_name: x.vwProductVariance.product_name,
        product_slug: x.vwProductVariance.product_slug,
        variance_name: x.vwProductVariance.variance_name,
        images: x.images.map((f: FileStorage) => f.url),
      };
      return item;
    });
    return list;
  }
}
export { FetchWishlistByUserIdService };
