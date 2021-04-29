import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class FetchChildCategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(parentId: number): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['products'],
      where: {
        parent_id: parentId,
        deleted_at: IsNull(),
      },
    });
  }
}
