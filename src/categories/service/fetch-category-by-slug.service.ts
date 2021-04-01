import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { FileStorage } from '../../common/file/entities/storage.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class FetchCategoryBySlugService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(slug: string): Promise<any | undefined> {
    const category = await this.categoryRepository.findOne({
      slug,
    });
    return getConnection()
      .createQueryBuilder()
      .select('category')
      .from(Category, 'category')
      .leftJoinAndMapMany(
        'category.files',
        FileStorage,
        'file',
        'category.id = file.type_id and file.type ="category"',
      )
      .where(`category.parent_id =${category?.id} and category.is_active =1`)
      .getMany();
  }
}
