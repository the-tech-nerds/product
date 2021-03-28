import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileStorageService } from 'src/common/file/filte.service';
import { Repository } from 'typeorm';
import { Shop } from '../../entities/shop.entity';
import { Category } from '../../../categories/entities/category.entity';

@Injectable()
export class FetchShopByIdService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    private fileService: FileStorageService,
  ) {}

  async execute(shopId: number): Promise<any | undefined> {
    const files = await this.fileService.getListByEntityId('shop', shopId);
    const item = await this.shopRepository.findOne({
      id: shopId,
    });
    return {
      images: files,
      shop: item,
    };
  }

  async getMultiShops(shopIds: number[]): Promise<Shop[] | undefined> {
    return this.shopRepository.findByIds(shopIds);
  }
}
