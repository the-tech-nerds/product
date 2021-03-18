import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductRequest } from 'src/products/requests/product.request';
import { FetchCategoryByIdService } from 'src/categories/service/fetch-category-by-id.service';
import { Repository } from 'typeorm';

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
    console.log('product req: ', productRequest);
    const product = await this.productRepository.save({
      ...productRequest,
      created_by: userId,
    });

    if (productRequest.category_id) {
      // @ts-ignore
      product.categories = await this.fetchCategoryByIdService.execute(
        productRequest.category_id,
      );

      console.log('product saved and with category : ', product);

      return this.productRepository.save(product);
    }

    return product;
  }
}

export { CreateProductService };
