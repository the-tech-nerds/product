import { Injectable } from '@nestjs/common';
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
    return this.categoryRepository.save({
      ...categoryRequest,
      created_by: userId,
    });
  }
}