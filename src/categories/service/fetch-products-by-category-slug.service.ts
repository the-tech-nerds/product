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
    query: PaginateQuery,
  ): Promise<Paginated<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndMapMany(
        'product.images',
        FileStorage,
        'file_product',
        'product.id = file_product.type_id and file_product.type ="product"',
      )
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.productVariances', 'variants')
      .leftJoinAndSelect('variants.unit', 'unit')
      .where('product.status = :status', { status: 1 })
      .where('categories.slug = :slug', { slug });

    return paginate(query, queryBuilder, Product, {
      sortableColumns: ['id'],
      searchableColumns: ['name', 'slug'],
      defaultSortBy: [['id', 'ASC']],
    });
  }
}
