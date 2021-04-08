import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { FetchCategoryByIdService } from '../../../categories/service/fetch-category-by-id.service';

@Injectable()
export class ListProductsService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
    private fetchCategoryByIdService: FetchCategoryByIdService,
  ) {}

  async execute(): Promise<Product[]> {
    return this.ProductRepository.find({
      relations: ['categories', 'brand'],
    });
  }

  async getProductsFromCategory(categoryId: number): Promise<Product[]> {
    const category = await this.fetchCategoryByIdService.execute(categoryId);

    return category.products;
  }
}
