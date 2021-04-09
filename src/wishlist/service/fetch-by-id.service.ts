import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Wishlist } from '../entities/wishlist.entity';

@Injectable()
class FetchWishlistByUserIdService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async execute(userId: number): Promise<any | undefined> {
    const items = await this.wishlistRepository.find({
      created_by: userId,
      deleted_at: IsNull(),
    });
    const wishlists = items.map((w: Wishlist) => ({
      id: w.id,
      product_variance_id: w.product_variance_Id,
    }));
    return wishlists;
  }
}
export { FetchWishlistByUserIdService };
