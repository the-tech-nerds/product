import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Category } from '../entities/category.entity';
import { CategoryRequest } from '../request/category.request';

@Injectable()
export class UpdateCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(
    id: number,
    userId: number,
    categoryRequest: CategoryRequest,
  ): Promise<Category | undefined> {
    await this.categoryRepository.update(id, {
      ...categoryRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.categoryRepository.findOne(id);
  }
}
