import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Shop } from '../../entities/shop.entity';

@Injectable()
export class DeleteShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.shopRepository.softDelete(id);
  }
}
