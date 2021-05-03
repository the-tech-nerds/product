import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { FetchCategoryByIdService } from '../../../categories/service/fetch-category-by-id.service';
import { FetchChildCategoriesService } from '../../../categories/service/fetch-child-categories.service';

@Injectable()
export class ListProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private fetchCategoryByIdService: FetchCategoryByIdService,
    private fetchChildCategoriesService: FetchChildCategoriesService,
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['categories', 'supplier', 'brand'],
    });
  }

  async getProductsFromCategory(categoryId: number): Promise<Product[]> {
    const { category } = await this.fetchCategoryByIdService.execute(
      categoryId,
    );
    const childCategories = await this.fetchChildCategoriesService.execute(
      categoryId,
    );
    const allCategories = [category, ...childCategories];

    return allCategories.reduce((acc, cat) => [...acc, ...cat.products], []);
  }
}
