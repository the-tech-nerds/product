import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductRequest } from 'src/products/requests/product.request';
import { FetchCategoryByIdService } from 'src/categories/service/fetch-category-by-id.service';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
class CreateProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    // private categoryRepository: Cate<Product>,
    private fetchCategoryByIdService: FetchCategoryByIdService,
  ) {}

  async create(
    userId: number,
    productRequest: ProductRequest,
  ): Promise<Product> {
    let category: Category | null = null;
    if (productRequest.category_id) {
      // @ts-ignore
      category = await this.fetchCategoryByIdService.execute(
        productRequest.category_id,
      );
      if (!category) {
        throw new BadRequestException('Not a valid category');
      }
    }
    const product = await this.productRepository.save({
      ...productRequest,
      created_by: userId,
      categories: category ? [category] : undefined,
    });

    return product;
  }
}

export { CreateProductService };
