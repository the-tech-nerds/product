import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { FetchShopByIdService } from '../../shops/service/shop/fetch-by-id.service';

@Injectable()
export class FetchCategoryByShopService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private fetchShopByIdService: FetchShopByIdService,
  ) {}

  async execute(shopId: number): Promise<any | undefined> {
    const shop = await this.fetchShopByIdService.execute(shopId);

    return this.categoryRepository.find({
      type_id: shop.type_id,
      deleted_at: IsNull(),
    });
  }
}
