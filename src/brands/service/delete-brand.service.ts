import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@Injectable()
class DeleteBrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.brandRepository.softDelete(id);
  }
}

export { DeleteBrandService };
