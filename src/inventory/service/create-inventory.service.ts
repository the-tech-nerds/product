import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { InventoryRequest } from '../request/inventory.request';
import { LocalDateToUtc } from '../../utils/date-time-conversion/date-time-conversion';
import { Shop } from '../../shops/entities/shop.entity';
import { FetchShopByIdService } from '../../shops/service/shop/fetch-by-id.service';
import { InventoryUpdateEvent } from '../events/inventory-update.event';

@Injectable()
class CreateInventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private fetchShopByIdService: FetchShopByIdService,
    private inventoryUpdateEvent: InventoryUpdateEvent,
  ) {}

  async create(
    userId: number,
    inventoryRequest: InventoryRequest[],
  ): Promise<Inventory[]> {
    const inventoryList: Inventory[] = [];
    for (const inventory of inventoryRequest) {
      // @ts-ignore
      const inventoryTemp = await this.inventoryRepository.save({
        stock_in_time: LocalDateToUtc(new Date()),
        product_variance_id: inventory.product_variance_id,
        stock_count: inventory.stock_count,
        price: inventory.price,
        shop_ids: inventory.shop_ids,
        status: inventory.status || 1,
        created_by: userId,
      });

      let shopList: Shop[] | null = null;
      if (inventory.shop_ids) {
        // @ts-ignore
        shopList = await this.fetchShopByIdService.getMultiShops(
          inventory.shop_ids,
        );
        if (!shopList) {
          throw new BadRequestException('Not a valid shop');
        }
      }

      inventoryTemp.shops = shopList || [];
      // @ts-ignore
      inventoryList.push(await this.inventoryRepository.save(inventoryTemp));
    }
    this.inventoryUpdateEvent.emit(JSON.stringify(inventoryList));
    return inventoryList;
  }
}

export { CreateInventoryService };
