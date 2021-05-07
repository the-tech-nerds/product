import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileStorageService } from 'src/common/file/filte.service';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
class FetchSupplierByIdService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private fileService: FileStorageService,
  ) {}

  async execute(supplierId: number): Promise<any | undefined> {
    const files = await this.fileService.getListByEntityId(
      'supplier',
      supplierId,
    );
    const item = await this.supplierRepository.findOne(
      {
        id: supplierId,
      },
      {
        relations: ['brands'],
      },
    );
    return {
      images: files,
      supplier: item,
    };
  }
}

export { FetchSupplierByIdService };
