import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Shop } from '../../entities/shop.entity';

@Injectable()
class ListShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async execute(): Promise<Shop[]> {
    return this.shopRepository.find({
      deleted_at: IsNull(),
    });
  }
}

export { ListShopService };
