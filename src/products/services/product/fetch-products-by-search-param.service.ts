import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  paginate,
  PaginateQuery,
  Paginated,
} from '@the-tech-nerds/common-services';
import { Product } from 'src/products/entities/product.entity';
// import { FileStorage } from 'src/common/file/entities/storage.entity';
@Injectable()
export class FetchProductsBySearchParamService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(
    paginateQuery: PaginateQuery,
    shopId: string,
  ): Promise<Paginated<Product>> {
    let queryBuilder: SelectQueryBuilder<any> = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.productVariances', 'variants')
      .leftJoinAndSelect('variants.unit', 'unit')
      .leftJoinAndSelect('variants.shops', 'shops')
      .where('product.status = :status', { status: 1 });

    if (shopId) {
      queryBuilder = queryBuilder.andWhere('shops.id = :shopId', {
        shopId,
      });
    }

    return paginate(paginateQuery, queryBuilder, Product, {
      sortableColumns: ['id'],
      searchableColumns: [
        'product.name',
        'product.slug',
        'variants.title',
        'categories.name',
      ],
      defaultSortBy: [['id', 'ASC']],
    });
  }
}
