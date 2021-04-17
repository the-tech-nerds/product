import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileStorageService } from 'src/common/file/filte.service';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
class FetchInventoryByIdService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private fileService: FileStorageService,
  ) {}

  async execute(inventoryId: number): Promise<any | undefined> {
    const files = await this.fileService.getListByEntityId(
      'inventory',
      inventoryId,
    );
    const item = await this.inventoryRepository.findOne({
      id: inventoryId,
    });
    return {
      images: files,
      inventory: item,
    };
  }
}
export { FetchInventoryByIdService };
