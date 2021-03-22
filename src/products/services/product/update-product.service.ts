import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from '../../../utils/date-time-conversion/date-time-conversion';
import { ProductRequest } from '../../requests/product.request';
import { Product } from '../../entities/product.entity';
import { Category } from '../../../categories/entities/category.entity';

@Injectable()
class UpdateProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(
    id: number,
    userId: number,
    productRequest: ProductRequest,
    categoryIds: number[] | undefined,
  ): Promise<Product | undefined> {
    const productUpdateReq = productRequest;
    console.log('in update product. categoryIds: ', categoryIds);
    console.log('in update product. req data original', productRequest);
    await this.productRepository.update(id, {
      ...productUpdateReq,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });

    console.log('product updated');
    const updatedProduct = await this.productRepository.findOneOrFail(id);

    console.log('updated product', updatedProduct);
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

    console.log('category list', categoryList);
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
