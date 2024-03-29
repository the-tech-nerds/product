import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Wishlist } from '../entities/wishlist.entity';
import { WishlistRequest } from '../request/wishlist.request';
import { LocalDateToUtc } from '../../utils/date-time-conversion/date-time-conversion';

@Injectable()
class CreateWishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(
    userId: number,
    wishlistRequest: WishlistRequest,
  ): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      created_by: userId,
      product_variance_Id: wishlistRequest.product_variance_Id,
      product_id: wishlistRequest.product_id,
      deleted_at: IsNull(),
    });
    if (wishlist) {
      throw new BadRequestException('Already in wishlist.');
    }
    return this.wishlistRepository.save({
      ...wishlistRequest,
      created_by: userId,
      created_at: LocalDateToUtc(new Date()),
    });
  }
}

export { CreateWishlistService };
