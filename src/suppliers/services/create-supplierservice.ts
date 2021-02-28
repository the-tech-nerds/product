import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import { SupplierRequest } from '../requests/supplier.request';

@Injectable()
class CreateSupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(
    userId: number,
    supplierRequest: SupplierRequest,
  ): Promise<Supplier> {
    return this.supplierRepository.save({
      ...supplierRequest,
      created_by: userId,
    });
  }
}

export { CreateSupplierService };
