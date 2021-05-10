import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Wishlist } from '../entities/wishlist.entity';

@Injectable()
class DeleteWishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.wishlistRepository.softDelete(id);
  }

  async deleteAll(userId: number): Promise<UpdateResult> {
    return this.wishlistRepository.softDelete({
      created_by: userId,
    });
  }
}

export { DeleteWishlistService };
