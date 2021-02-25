import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
class DeleteSupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.supplierRepository.softDelete(id);
  }
}

export { DeleteSupplierService };
