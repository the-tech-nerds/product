import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {
  CRUDEvent,
  EventTypes,
  Microservices,
} from '@the-tech-nerds/common-services';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
class DeleteInventoryService {
  private readonly crudEvent = new CRUDEvent(Microservices.PRODUCT_SERVICE);

  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    const inventoryData = await this.inventoryRepository.find({
      where: {
        id,
      },
    });
    this.crudEvent.emit(
      'inventory',
      Microservices.PRODUCT_SERVICE,
      EventTypes.DELETE,
      JSON.stringify(inventoryData),
    );
    return this.inventoryRepository.softDelete(id);
  }
}

export { DeleteInventoryService };
