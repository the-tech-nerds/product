import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { FileStorage } from 'src/common/file/entities/storage.entity';
import { Wishlist } from '../entities/wishlist.entity';

@Injectable()
class FetchWishlistByUserIdService {
  async execute(userId: number): Promise<any | undefined> {
    const wishlists = await getConnection()
      .createQueryBuilder()
      .select('wishlist')
      .from(Wishlist, 'wishlist')
      .leftJoinAndMapOne(
        'wishlist.product_variance',
        ProductVariance,
        'variance',
        'variance.id = wishlist.product_variance_Id',
      )
      .leftJoinAndMapMany(
        'product.images',
        FileStorage,
        'file',
        'product.id = file.type_id and file.type ="product"',
      )
      .where(`wishlist.created_by =${userId}`)
      .getMany();

    return wishlists;
  }
}
export { FetchWishlistByUserIdService };
