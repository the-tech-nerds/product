import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Shop } from '../../entities/shop.entity';
import { ShopRequest } from '../../request/shop.request';

@Injectable()
export class UpdateShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async execute(
    id: number,
    userId: number,
    shopRequest: ShopRequest,
  ): Promise<Shop | undefined> {
    await this.shopRepository.update(id, {
      ...shopRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.shopRepository.findOne(id);
  }
}
