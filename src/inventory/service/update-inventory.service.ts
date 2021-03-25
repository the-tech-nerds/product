import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Inventory } from '../entities/inventory.entity';
import { InventoryRequest } from '../request/inventory.request';

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
    return this.inventoryRepository.findOne(id);
  }
}
export { UpdateInventoryService };
