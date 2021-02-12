import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class FetchByIdService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(categoryId: number): Promise<Category | undefined> {
    return this.categoryRepository.findOne({
      id: categoryId,
    });
  }
}
