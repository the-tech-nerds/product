import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from '../../entities/shop.entity';
import { ShopRequest } from '../../request/shop.request';

@Injectable()
export class CreateShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async create(userId: number, shopRequest: ShopRequest): Promise<Shop> {
    return this.shopRepository.save({
      ...ShopRequest,
      created_by: userId,
    });
  }
}
