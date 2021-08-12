import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class FetchVariancesByIdsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(ids: number[]): Promise<ProductVariance[] | undefined> {
    let products: Product[] = [];
    let variances: ProductVariance[] = [];
    const items = await this.categoryRepository.find({
      relations: ['products', 'products.productVariances'],
      where: {
        id: In(ids),
      },
    });
    items.forEach(element => {
      products = products.concat(element.products);
    });
    products.forEach(element => {
      variances = variances.concat(element.productVariances);
    });
    return variances;
  }
}
