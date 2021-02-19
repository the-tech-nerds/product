import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Supplier } from '../entities/supplier.entity';
import { SupplierRequest } from '../requests/supplier.request';

@Injectable()
class UpdateSupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async execute(
    id: number,
    userId: number,
    supplierRequest: SupplierRequest,
  ): Promise<Supplier | undefined> {
    await this.supplierRepository.update(id, {
      ...supplierRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.supplierRepository.findOne(id);
  }
}
export { UpdateSupplierService };
