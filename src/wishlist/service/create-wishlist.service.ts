import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this.wishlistRepository.save({
      ...wishlistRequest,
      created_by: userId,
      created_at: LocalDateToUtc(new Date()),
    });
  }
}

export { CreateWishlistService };
