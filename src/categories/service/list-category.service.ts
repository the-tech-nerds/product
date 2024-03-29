import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class ListCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.find({
      deleted_at: IsNull(),
    });
  }
}
