import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
class ListSupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async execute(): Promise<Supplier[]> {
    return this.supplierRepository.find({
      is_active: true,
    });
  }
}

export { ListSupplierService };
