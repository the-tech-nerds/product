import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { InventoryRequest } from '../request/inventory.request';
import { LocalDateToUtc } from '../../utils/date-time-conversion/date-time-conversion';
import { Shop } from '../../shops/entities/shop.entity';
import { FetchShopByIdService } from '../../shops/service/shop/fetch-by-id.service';

@Injectable()
class CreateInventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private fetchShopByIdService: FetchShopByIdService,
  ) {}

  async create(
    userId: number,
    inventoryRequest: InventoryRequest,
  ): Promise<Inventory> {
    inventoryRequest.stock_in_time = LocalDateToUtc(new Date());
    const inventory = await this.inventoryRepository.save({
      ...inventoryRequest,
      created_by: userId,
    });

    let shopList: Shop[] | null = null;
    if (inventoryRequest.shop_ids) {
      // @ts-ignore
      shopList = await this.fetchShopByIdService.getMultiShops(
        inventoryRequest.shop_ids,
      );
      if (!shopList) {
        throw new BadRequestException('Not a valid shop');
      }
    }

    inventory.shops = shopList || [];
    return this.inventoryRepository.save(inventory);
  }
}

export { CreateInventoryService };
