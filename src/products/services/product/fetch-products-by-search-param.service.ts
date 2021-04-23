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
export class FetchProductsBySearchParamService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(paginateQuery: PaginateQuery): Promise<Paginated<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.productVariances', 'variants')
      .leftJoinAndSelect('variants.unit', 'unit')
      .leftJoinAndMapMany(
        'variants.images',
        FileStorage,
        'file',
        'variants.id = file.type_id and file.type ="product_variance"',
      )
      .where('product.status = :status', { status: 1 });
    // .where('categories.slug = :slug', { searchQuery });

    return paginate(paginateQuery, queryBuilder, Product, {
      sortableColumns: ['id'],
      searchableColumns: ['name', 'slug'],
      defaultSortBy: [['id', 'ASC']],
    });
  }
}
