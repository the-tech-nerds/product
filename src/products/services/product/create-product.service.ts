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
    private fetchCategoryByIdService: FetchCategoryByIdService,
  ) {}

  async create(
    userId: number,
    productRequest: ProductRequest,
  ): Promise<Product> {
    const product = await this.productRepository.save({
      ...productRequest,
      created_by: userId,
    });

    let categoryList: Category[] | null = null;
    if (productRequest.category_ids) {
      // @ts-ignore
      categoryList = await this.fetchCategoryByIdService.getMultiCategories(
        productRequest.category_ids,
      );
      if (!categoryList) {
        throw new BadRequestException('Not a valid category');
      }
    }

    product.categories = categoryList || [];
    return this.productRepository.save(product);
  }
}

export { CreateProductService };
