import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from '../../entities/shop.entity';

@Injectable()
export class FetchShopByIdService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async execute(shopId: number): Promise<Shop | undefined> {
    return this.shopRepository.findOne({
      id: shopId,
    });
  }
}
