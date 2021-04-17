import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
class DeleteInventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.inventoryRepository.softDelete(id);
  }
}

export { DeleteInventoryService };
