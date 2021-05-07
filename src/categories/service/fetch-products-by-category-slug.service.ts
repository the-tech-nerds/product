import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { FileStorage } from 'src/common/file/entities/storage.entity';
import {
  paginate,
  PaginateQuery,
  Paginated,
} from '@the-tech-nerds/common-services';

@Injectable()
export class FetchProductsByCategorySlugService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(
    slug: string,
    shopId: string,
    query: PaginateQuery,
  ): Promise<Paginated<Product>> {
    let queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.productVariances', 'variants')
      .leftJoinAndMapMany(
        'variants.images',
        FileStorage,
        'file_product_variant',
        'variants.id = file_product_variant.type_id and file_product_variant.type ="product-variance"',
      )
      .leftJoinAndSelect('variants.unit', 'unit')
      .leftJoinAndSelect('variants.shops', 'shops')
      .where('product.status = :status', { status: 1 })
      .andWhere('categories.slug = :slug', { slug });

    if (shopId) {
      queryBuilder = queryBuilder.andWhere('shops.id = :shopId', {
        shopId: Number(shopId),
      });
    }

    return paginate(query, queryBuilder, Product, {
      sortableColumns: ['id'],
      searchableColumns: ['name', 'slug'],
      defaultSortBy: [['id', 'ASC']],
    });
  }
}
