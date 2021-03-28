import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const slug = await this.categoryRepository.find({
      slug: categoryRequest.slug,
    });
    if (slug) {
      throw new BadRequestException('Slug must be unique.');
    }
    const category = await this.categoryRepository.save({
      ...categoryRequest,
      created_by: userId,
    });

    return category;
  }
}
