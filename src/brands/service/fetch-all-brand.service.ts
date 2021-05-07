import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { FetchSupplierByIdService } from '../../suppliers/services/fetch-by-id.service';

@Injectable()
class ListBrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private fetchSupplierByIdService: FetchSupplierByIdService,
  ) {}

  async execute(): Promise<Brand[]> {
    return this.brandRepository.find({
      relations: ['supplier'],
      where: {
        deleted_at: IsNull(),
      },
    });
  }

  async getBrandsBySupplierId(supplierId: number): Promise<Brand[]> {
    const supplier = await this.fetchSupplierByIdService.execute(supplierId);
    return supplier.supplier.brands;
  }
}

export { ListBrandService };
