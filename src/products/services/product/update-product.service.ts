import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { convertToSlug } from 'src/utils/utils';
import { LocalDateToUtc } from '../../../utils/date-time-conversion/date-time-conversion';
import { ProductRequest } from '../../requests/product.request';
import { Product } from '../../entities/product.entity';
import { Category } from '../../../categories/entities/category.entity';
import { FetchCategoryByIdService } from '../../../categories/service/fetch-category-by-id.service';

@Injectable()
class UpdateProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private fetchCategoryByIdService: FetchCategoryByIdService,
  ) {}

  async execute(
    id: number,
    userId: number,
    productRequest: ProductRequest,
    categoryIds: number[] | undefined,
  ): Promise<Product | undefined> {
    await this.productRepository.update(id, {
      ...productRequest,
      updated_by: userId,
      slug: convertToSlug(productRequest.name),
      updated_at: LocalDateToUtc(new Date()),
    });
    const updatedProduct = await this.productRepository.findOneOrFail(id);
    let categoryList: Category[] | null = null;
    if (categoryIds) {
      // @ts-ignore
      categoryList = await this.fetchCategoryByIdService.getMultiCategories(
        categoryIds,
      );
      if (!categoryList) {
        throw new BadRequestException('Not a valid category');
      }
    }
    updatedProduct.categories = categoryList || [];
    return this.productRepository.save(updatedProduct);
  }

  async changeStatus(id: number): Promise<Product | undefined | void> {
    const product = await this.productRepository.findOneOrFail(id);
    product.status = !product.status;
    return this.productRepository.save(product);
  }
}

export { UpdateProductService };
