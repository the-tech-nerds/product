import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  PaginateQuery,
  Paginated,
} from '@the-tech-nerds/common-services';
import { Product } from 'src/products/entities/product.entity';
import { FileStorage } from 'src/common/file/entities/storage.entity';
// import { STATUS_CODES } from 'http';

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
        'variants.id = file_product_variant.type_id and file_product_variant.type ="product_variance"',
      )
      .leftJoinAndSelect('variants.unit', 'unit')
      .leftJoinAndSelect('variants.shops', 'shops')
      .where('product.status = :status', { status: 1 })
      .where('categories.slug = :slug', { slug });

    if (shopId) {
      queryBuilder = queryBuilder.where('shops.id = :shopId', {
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
