import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Brand } from '../entities/brand.entity';
import { BrandRequest } from '../request/brand.request';

@Injectable()
class UpdateBrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async execute(
    id: number,
    userId: number,
    brandRequest: BrandRequest,
  ): Promise<Brand | undefined> {
    await this.brandRepository.update(id, {
      ...brandRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.brandRepository.findOne(id);
  }
}
export { UpdateBrandService };
