import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { ProductRequest } from 'src/products/requests/product.request';
import { FetchCategoryByIdService } from 'src/categories/service/fetch-category-by-id.service';
import { Repository } from 'typeorm';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { FileStorage } from 'src/common/file/entities/storage.entity';
// import { Category } from 'src/categories/entities/category.entity';
// import { convertToSlug } from 'src/utils/utils';

@Injectable()
export class CreateMockProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
    @InjectRepository(FileStorage)
    private storageRepository: Repository<FileStorage>,
    private fetchCategoryByIdService: FetchCategoryByIdService,
  ) {}

  async create(count = 200): Promise<void> {
    const categories = await this.fetchCategoryByIdService.getMultiCategories([
      1,
    ]);

    const products: Product[] = [...Array(count).keys()].map(
      (_, key: number) =>
        ({
          id: key + 1,
          name: `product-${key + 1}`,
          created_by: 1,
          slug: `product-${key + 1}`,
          categories,
          shop_id: 1,
        } as Product),
    );

    const productsVariances = [...Array(count).keys()].map(
      (_, key: number) =>
        ({
          id: key + 1,
          title: `product-${key + 1}`,
          price: 44.0,
          sku: `product-${key + 1}`,
          created_by: 1,
          unit_id: 1,
          unit_value: '3',
          product_id: key + 1,
        } as ProductVariance),
    );

    console.log(products[0]);
    console.log(productsVariances[0]);

    const productImages: FileStorage[] = [...Array(count).keys()].map(
      (_, key: number) =>
        ({
          url:
            'https://khan-fresh-corner.s3.amazonaws.com/category/6d420c88-396c-4f05-ad45-0067f4f135a7.jpg',
          type: 'product',
          type_id: key + 1,
        } as FileStorage),
    );

    const productVarianceImages: FileStorage[] = [...Array(count).keys()].map(
      (_, key: number) =>
        ({
          url:
            'https://khan-fresh-corner.s3.amazonaws.com/category/6d420c88-396c-4f05-ad45-0067f4f135a7.jpg',
          type: 'product_variance',
          type_id: key + 1,
        } as FileStorage),
    );

    await this.productRepository.save(products);
    await this.productVarianceRepository.save(productsVariances);
    await this.storageRepository.save(productImages);
    await this.storageRepository.save(productVarianceImages);
    // const product = await this.productRepository.save({
    //   ...productRequest,
    //   slug: convertToSlug(productRequest.name),
    //   created_by: userId,
    // });

    // let categoryList: Category[] | null = null;
    // if (productRequest.category_ids) {
    //   // @ts-ignore
    //   categoryList = await this.fetchCategoryByIdService.getMultiCategories(
    //     productRequest.category_ids,
    //   );
    //   if (!categoryList) {
    //     throw new BadRequestException('Not a valid category');
    //   }
    // }

    // product.categories = categoryList || [];
    // return this.productRepository.save(product);
  }
}
