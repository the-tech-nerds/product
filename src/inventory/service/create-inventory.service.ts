import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { InventoryRequest } from '../request/inventory.request';
import { LocalDateToUtc } from '../../utils/date-time-conversion/date-time-conversion';

@Injectable()
class CreateInventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(
    userId: number,
    inventoryRequest: InventoryRequest,
  ): Promise<Inventory> {
    inventoryRequest.stock_in_time = LocalDateToUtc(new Date());
    return this.inventoryRepository.save({
      ...inventoryRequest,
      created_by: userId,
    });
  }
}

export { CreateInventoryService };
