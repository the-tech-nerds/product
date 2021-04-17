import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileStorageService } from 'src/common/file/filte.service';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class FetchCategoryByIdService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private fileService: FileStorageService,
  ) {}

  async execute(categoryId: number): Promise<any | undefined> {
    const files = await this.fileService.getListByEntityId(
      'category',
      categoryId,
    );
    const item = await this.categoryRepository.findOne(
      {
        id: categoryId,
      },
      {
        relations: ['products'],
      },
    );
    return {
      images: files,
      category: item,
    };
  }

  async getMultiCategories(
    categoryIds: number[],
  ): Promise<Category[] | undefined> {
    return this.categoryRepository.findByIds(categoryIds);
  }
}
