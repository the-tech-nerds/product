import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Inventory, InventoryStatusType } from '../entities/inventory.entity';
import { InventoryRequest } from '../request/inventory.request';
import { Shop } from '../../shops/entities/shop.entity';

@Injectable()
class UpdateInventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async execute(
    id: number,
    userId: number,
    inventoryRequest: InventoryRequest,
  ): Promise<Inventory | undefined> {
    await this.inventoryRepository.update(id, {
      ...inventoryRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    const updatedInventory = await this.inventoryRepository.findOneOrFail(id);

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

    updatedInventory.shops = shopList || [];
    return this.inventoryRepository.save(updatedInventory);
  }

  async changeStatus(id: number): Promise<Inventory | undefined | void> {
    const inventory = await this.inventoryRepository.findOneOrFail(id);
    inventory.status =
      inventory.status === InventoryStatusType.DRAFT
        ? InventoryStatusType.ACTIVE
        : InventoryStatusType.DRAFT;

    return this.inventoryRepository.save(inventory);
  }
}

export { UpdateInventoryService };
