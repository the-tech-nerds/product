import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { BrandRequest } from '../request/brand.request';

@Injectable()
class CreateBrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async create(userId: number, brandRequest: BrandRequest): Promise<Brand> {
    return this.brandRepository.save({
      ...brandRequest,
      created_by: userId,
    });
  }
}

export { CreateBrandService };
