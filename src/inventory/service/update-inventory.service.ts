import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CRUDEvent,
  EventTypes,
  Microservices,
} from '@the-tech-nerds/common-services';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Inventory, InventoryStatusType } from '../entities/inventory.entity';
import { InventoryRequest } from '../request/inventory.request';
import { InventoryUpdateRequest } from '../request/inventory-update.request';

@Injectable()
class UpdateInventoryService {
  private readonly crudEvent = new CRUDEvent(Microservices.PRODUCT_SERVICE);

  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private inventoryRequest: InventoryRequest,
  ) {}

  async execute(
    id: number,
    userId: number,
    inventoryUpdateRequest: InventoryUpdateRequest,
  ): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOneOrFail(id);

    this.inventoryRequest = {
      price: inventoryUpdateRequest.price,
      stock_count: inventoryUpdateRequest.stock_count,
      product_variance_id: inventory.product_variance_id,
      shop_ids: [],
    };

    delete this.inventoryRequest.shop_ids;

    await this.inventoryRepository.update(id, {
      ...this.inventoryRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });

    const updatedInventory = await this.inventoryRepository.findOneOrFail(id);

    this.crudEvent.emit(
      'inventory',
      Microservices.PRODUCT_SERVICE,
      EventTypes.UPDATE,
      JSON.stringify(updatedInventory),
    );

    return updatedInventory;
    /* const updatedInventory = await this.inventoryRepository.findOneOrFail(id);

    let shopList: Shop[] | null = null;
    if (inventoryUpdateRequest.shop_ids) {
      // @ts-ignore
      shopList = await this.fetchShopByIdService.getMultiShops(
        inventoryUpdateRequest.shop_ids,
      );
      if (!shopList) {
        throw new BadRequestException('Not a valid shop');
      }
    }

    updatedInventory.shops = shopList || [];
    return this.inventoryRepository.save(updatedInventory); */
  }

  async changeStatus(id: number): Promise<Inventory | undefined | void> {
    const inventory = await this.inventoryRepository.findOneOrFail(id);
    inventory.status =
      inventory.status === InventoryStatusType.DRAFT
        ? InventoryStatusType.ACTIVE
        : InventoryStatusType.DRAFT;
    const updatedInventory = await this.inventoryRepository.save(inventory);
    this.crudEvent.emit(
      'inventory',
      Microservices.PRODUCT_SERVICE,
      EventTypes.UPDATE,
      JSON.stringify(updatedInventory),
    );
    return updatedInventory;
  }
}

export { UpdateInventoryService };
