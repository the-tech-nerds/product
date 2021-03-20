import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class FetchCategoryByIdService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(categoryId: number): Promise<Category | undefined> {
    return this.categoryRepository.findOne({
      id: categoryId,
    });
  }

  async getMultiCategories(
    categoryIds: number[],
  ): Promise<Category[] | undefined> {
    return this.categoryRepository.findByIds(categoryIds);
  }
}
