import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { convertToSlug } from '../../utils/utils';
import { Category } from '../entities/category.entity';
import { CategoryRequest } from '../request/category.request';

@Injectable()
export class CreateCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    userId: number,
    categoryRequest: CategoryRequest,
  ): Promise<Category> {
    categoryRequest.parent_id = categoryRequest.parent_id
      ? categoryRequest.parent_id
      : 0;
    const category = await this.categoryRepository.save({
      ...categoryRequest,
      slug: convertToSlug(categoryRequest.name),
      created_by: userId,
    });

    return category;
  }
}
