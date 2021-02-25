import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@Injectable()
class FetchBrandByIdService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async execute(brandId: number): Promise<Brand | undefined> {
    return this.brandRepository.findOne({
      id: brandId,
    });
  }
}
export { FetchBrandByIdService };
