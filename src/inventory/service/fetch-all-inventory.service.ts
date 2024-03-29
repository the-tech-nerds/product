import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
class ListInventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async execute(): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      relations: ['productVariance', 'productVariance.product', 'shops'],
      where: {
        deleted_at: IsNull(),
      },
      order: {
        id: 'DESC',
      },
    });
  }
}

export { ListInventoryService };
