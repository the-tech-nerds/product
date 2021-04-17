import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class DeleteCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.categoryRepository.softDelete(id);
  }
}
