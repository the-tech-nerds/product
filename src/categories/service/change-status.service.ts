import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class ChangeStatusService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(id: number): Promise<Category | undefined | void> {
    const category = await this.categoryRepository.findOneOrFail(id);
    category.is_active = !category.is_active;
    return this.categoryRepository.save(category);
  }
}
