import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@Injectable()
class ListBrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async execute(): Promise<Brand[]> {
    return this.brandRepository.find({
      relations: ['supplier'],
      where: {
        deleted_at: IsNull(),
      },
    });
  }
}

export { ListBrandService };
