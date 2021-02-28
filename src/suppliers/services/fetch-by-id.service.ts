import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
class FetchSupplierByIdService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async execute(SupplierId: number): Promise<Supplier | undefined> {
    return this.supplierRepository.findOne({
      id: SupplierId,
    });
  }
}
export { FetchSupplierByIdService };
